<?php

namespace App\Repositories;

use App\Interfaces\ReportCategoryRepositoryInterface;
use App\Models\ReportCategory; // Assuming you have a ReportCategory model
use App\Models\Resident; // Assuming you have a Resident model
use App\Models\User; // Assuming you have a User model

class ReportCategoryRepository implements ReportCategoryRepositoryInterface
{
    public function getAllReportCategories()
    {
        return ReportCategory::all(); 
    }

    public function getReportCategoryById(int $id)
    {
        return ReportCategory::where('id', $id)->first();
    }

    public function createReportCategory(array $data)
    {
       return ReportCategory::create($data);
    }

    // ... di dalam method updateReportCategory ...

public function updateReportCategory(array $data, int $id)
{
    $reportCategory = $this->getReportCategoryById($id); // Mendapatkan instance model

    // Cek apakah kategori ditemukan sebelum memperbarui
    if ($reportCategory) {
        $reportCategory->update($data); // Panggil update() pada instance model
        return $reportCategory; // Atau kembalikan true/false, tergantung kebutuhan
    }

    return null; // Atau lempar exception jika kategori tidak ditemukan
}

    public function deleteReportCategory(int $id)
    {
        $reportCategory = $this->getReportCategoryById($id);

        return $reportCategory->delete();
    }
}