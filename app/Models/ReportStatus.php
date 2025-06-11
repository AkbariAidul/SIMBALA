<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReportStatus extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'report_id',
        'image',
        'status',
        'description'
    ];

    // relasi dengan model Report
    public function report()
    {
        // 1 status laporan dimiliki oleh 1 laporan
        return $this->belongsTo(Report::class);
    }
}
