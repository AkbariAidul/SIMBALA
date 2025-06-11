@extends('layouts.app')

{{-- Perbaikan: Menggunakan $report->code langsung karena Anda tidak ingin optional()
     Pastikan di controller, $report dijamin tidak null, misal dengan firstOrFail() --}}
@section('title', $report->code)

@section('content')
    {{-- Tambahkan padding-bottom yang lebih besar pada kontainer utama (Tailwind CSS)
         pb-24 setara dengan padding-bottom: 6rem;
         Ini akan memberi ruang antara konten dan fixed footer di bagian bawah --}}
    <div class="max-w-screen-sm mx-auto bg-white min-vh-100 p-3 pb-24"> 

        <div class="header-nav">
            <a href="{{ route('home') }}">
                {{-- Pastikan path asset ini benar --}}
                <img src="{{ asset('assets/app/images/icons/ArrowLeft.svg') }}" alt="arrow-left">
            </a>

            <h1>Detail Laporan {{ $report->code }}</h1>
        </div>

        {{-- Perbaikan: Path asset yang benar 'storage/' . $report->image --}}
        <img src="{{ asset('storage/' . $report->image) }}" alt="Gambar Laporan" class="report-image mt-5">

        <h1 class="report-title mt-3">{{ $report->title }}</h1>

        <div class="card card-report-information mt-4">
            <div class="card-body">
                <div class="card-title mb-4 fw-bold">Detail Informasi</div>

                <div class="row mb-3">
                    <div class="col-4 text-secondary">Kode</div>
                    <div class="col-8 d-flex">
                        <span class="me-2">:</span>
                        <p>{{ $report->code }}</p>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 text-secondary">Tanggal</div>
                    <div class="col-8 d-flex">
                        <span class="me-2">:</span>
                        <p>
                            {{ \Carbon\Carbon::parse($report->created_at)}}
                        </p>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 text-secondary">Kategori</div>
                    <div class="col-8 d-flex">
                        <span class="me-2">:</span>
                        {{-- Menggunakan $report->reportCategory->name sesuai code asli Anda --}}
                        <p>{{ $report->reportCategory->name }}</p> 
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 text-secondary">Lokasi</div>
                    <div class="col-8 d-flex">
                        <span class="me-2">:</span>
                        <p>{{ $report->address }}</p>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 text-secondary">Status</div>
                    <div class="col-8 d-flex">
                        <span class="me-2">:</span>
                        
                        @php
                            $lastStatus = trim(strtolower($report->reportStatuses->last()->status));
                        @endphp

                        @if ($lastStatus === 'delivered')
                            <div class="badge-pending">
                                {{-- Pastikan path icon ini benar --}}
                                <img src="{{ asset('assets/app/images/icons/CircleNotch.svg') }}" alt="pending">
                                <p>Terkirim</p>
                            </div>
                        @elseif ($lastStatus === 'in_process') {{-- Menggunakan elseif untuk menghindari rendering ganda --}}
                            <div class="badge-pending">
                                <img src="{{ asset('assets/app/images/icons/CircleNotch.svg') }}" alt="pending">
                                <p>Diproses</p>
                            </div>
                        @elseif ($lastStatus === 'completed')
                            <div class="badge-success">
                                <img src="{{ asset('assets/app/images/icons/Checks.svg') }}" alt="completed"> {{-- Alt text diubah --}}
                                <p>Selesai</p>
                            </div>
                        @elseif ($lastStatus === 'rejected')
                            <!-- <div class="badge-danger"> {{-- Menggunakan kelas badge-danger (pastikan CSS-nya ada) --}}
                                {{-- Jika ada icon untuk rejected, masukkan di sini. Jika tidak, hapus tag img. --}}
                                <img src="{{ asset('assets/app/images/icons/CircleNotch.svg') }}" alt="rejected"> {{-- Alt text diubah --}}
                                <p>Ditolak</p> {{-- Mengubah teks dari "Selesai" menjadi "Ditolak" --}}
                            </div> -->
                            <div class="badge-danger">
                                 {{-- Alt text diubah --}}
                                <p>Ditolak</p>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <div class="card card-report-information mt-4">
            <div class="card-body">
                <div class="card-title mb-4 fw-bold">Riwayat Perkembangan</div>

                <ul class="timeline">
                    {{-- Menggunakan @forelse untuk menangani kasus jika $report->reportStatuses kosong.
                         Diasumsikan $report->reportStatuses sendiri tidak null. --}}
                    @forelse ($report->reportStatuses as $status)
                    <li class="timeline-item">
                        <div class="timeline-item-content">
                            @if($status->image)
                                <img src="{{ asset('storage/' . $status->image) }}" alt="status" class="img-fluid">
                            @endif
                            <span class="timeline-date">
                                {{ \Carbon\Carbon::parse($status->created_at)->format('d M Y') }}
                            </span>
                            <span class="timeline-event">
                                {{ $status->description }}
                            </span>
                        </div>
                    </li>
                    @empty
                        <li class="timeline-item">
                            <div class="timeline-item-content">
                                <p class="text-secondary">Belum ada riwayat perkembangan untuk laporan ini.</p>
                            </div>
                        </li>
                    @endforelse
                </ul>
            </div>
        </div>
    </div>
@endsection
