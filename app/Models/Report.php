<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'code',
        'resident_id',
        'report_category_id',
        'title',
        'description',
        'image',
        'latitude',
        'longitude',
        'address'
    ];

    // membuat relasi dengan model Resident
    public function resident()
    {
        // 1 laporan dimiliki oleh 1 resident
        return $this->belongsTo(Resident::class);
    }

    public function reportCategory ()
    {
        // 1 laporan dimiliki oleh 1 kategori laporan
        return $this->belongsTo(ReportCategory::class);
    }

    public function reportstatuses()
    {
        // 1 laporan bisa memiliki banyak status
        return $this->hasMany(ReportStatus::class);
    }
}
