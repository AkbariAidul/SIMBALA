<?php

namespace App\Repositories;

use App\Interfaces\ReportStatusRepositoryInterface;
use App\Models\ReportStatus; // Assuming you have a ReportStatus model
use App\Models\ReportCategory; // Assuming you have a ReportCategory model
use App\Models\Resident; // Assuming you have a Resident model
use App\Models\User; // Assuming you have a User model
use App\Models\Report; // Import the Report model

class ReportStatusRepository implements ReportStatusRepositoryInterface
{
    public function getAllReportsStatuses()
    {
        return ReportStatus::all(); 
    }

    public function getReportStatusById(int $id)
    {
        return ReportStatus::where('id', $id)->first();
    }

    public function createReportStatus(array $data)
    {
       return ReportStatus::create($data);
    }

    // ... di dalam method updateReport ...

public function updateReportStatus(array $data, int $id)
{
    $reportStatus = $this->getReportStatusById($id); // Mendapatkan instance model

    return $reportStatus->update($data); // Panggil update() pada instance model
    
}

    public function deleteReportStatus(int $id)
    {
        $reportStatus = $this->getReportStatusById($id);

        return $reportStatus->delete();
    }
}