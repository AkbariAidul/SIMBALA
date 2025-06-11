<?php

namespace App\Repositories;

use App\Interfaces\ReportRepositoryInterface;
use App\Models\ReportCategory; // Assuming you have a ReportCategory model
use App\Models\Resident; // Assuming you have a Resident model
use App\Models\User; // Assuming you have a User model
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;
use App\Models\Report; // Import the Report model
use Illuminate\Database\Eloquent\Builder; // Import the Builder class
use Illuminate\Database\Eloquent\Collection; // Import Collection class for return type hint

class ReportRepository implements ReportRepositoryInterface
{
    public function getAllReports()
    {
        return Report::all();
    }

    public function getLatestReports(): Collection // Tambahkan return type
    {
        return Report::latest()->take(5)->get(); // Mengambil 5 laporan terbaru
    }

    // Ubah parameter $status menjadi nullable dan berikan nilai default null
    public function getReportsByResidentId(?string $status = null): Collection
    {
        $query = Report::where('resident_id', Auth::user()->resident->id);

        if ($status) { // Hanya terapkan filter status jika $status tidak null
            $query->whereHas('reportStatuses', function (Builder $query) use ($status) {
                // Di sini, kita ingin memastikan ada 'report_status' yang cocok dengan status yang diberikan
                // DAN merupakan status terbaru untuk report_id tersebut.

                // Pertama, filter berdasarkan status
                $query->where('status', $status);

                // Kemudian, tambahkan kondisi untuk memastikan ini adalah status terbaru
                $query->whereIn('id', function ($subQuery) {
                    $subQuery->selectRaw('MAX(id)')
                        ->from('report_statuses')
                        ->groupBy('report_id');
                });
            });
        }

        return $query->get(); // Panggil get() di akhir query
    }

    public function getReportById(int $id): ?Report // Tambahkan return type
    {
        return Report::where('id', $id)->first();
    }

    public function getReportByCode(string $code): ?Report // Tambahkan return type
    {
        return Report::where('code', $code)->first();
    }

    public function getReportsByCategory(string $category): Collection // Tambahkan return type
    {
        $categoryModel = ReportCategory::where('name', $category)->first(); // Ganti nama variabel agar tidak bentrok dengan parameter

        if (!$categoryModel) {
            return collect(); // Kembalikan koleksi kosong jika kategori tidak ditemukan
        }

        return Report::where('report_category_id', $categoryModel->id)->get();
    }

    public function createReport(array $data): Report // Tambahkan return type
    {
       $report = Report::create($data);

       $report->reportstatuses()->create([
           'status' => 'delivered',
           'description' => 'Laporan Berhasil Diterima'
       ]);

       return $report;
    }

    public function updateReport(array $data, int $id): ?Report // Tambahkan return type
    {
        $report = $this->getReportById($id);

        if ($report) {
            $report->update($data);
            return $report;
        }

        return null;
    }

    public function deleteReport(int $id): bool // Tambahkan return type
    {
        $report = $this->getReportById($id);

        if ($report) {
            return $report->delete();
        }
        return false; // Kembalikan false jika laporan tidak ditemukan
    }
}