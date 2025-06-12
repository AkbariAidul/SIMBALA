<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Interfaces\ReportCategoryRepositoryInterface;
use App\Interfaces\ReportRepositoryInterface;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    private ReportRepositoryInterface $reportRepository;
    private ReportCategoryRepositoryInterface $reportCategoryRepository;

    public function __construct(
        ReportRepositoryInterface $reportRepository,
        ReportCategoryRepositoryInterface $reportCategoryRepository
    ) {
        $this->reportRepository = $reportRepository;
        $this->reportCategoryRepository = $reportCategoryRepository;
    }

    public function index(Request $request)
    {

        if ($request->category) {
            $reports = $this->reportRepository->getReportsByCategory($request->category);
        } else {
            $reports = $this->reportRepository->getAllReports();
        }

        return view('pages.app.report.index', compact('reports'));
    }

    public function myReport(Request $request)
    {
        // Sekarang, $request->status bisa null, dan fungsi di repository akan menanganinya.
        $reports = $this->reportRepository->getReportsByResidentId($request->status);

        return view('pages.app.report.my-report', compact('reports'));
    }

    public function show($code)
    {
        $report = $this->reportRepository->getReportByCode($code);

        return view('pages.app.report.show', compact('report'));
    }

    public function take()
    {
        return view('pages.app.report.take');
    }

    public function preview()
    {
        return view('pages.app.report.preview');
    }

    public function create()
    {
        $categories = $this->reportCategoryRepository->getAllReportCategories();

        return view('pages.app.report.create', compact('categories'));
    }

    public function store(StoreReportRequest $request)
    {
        // dd($data);

        $data = $request->validated();
        $data['code'] = 'USBLBTL' . mt_rand(100000, 999999);

        // Menyimpan ID dari user yang sedang login
        $data['resident_id'] = Auth::user()->id;
    
        $data['image'] = $request->file('image')->store('assets/report/image', 'public');

        // Mapping lat/lng ke latitude/longitude
        $data['latitude'] = $data['lat'];
        $data['longitude'] = $data['lng'];
        unset($data['lat'], $data['lng']);

        $this->reportRepository->createReport($data);

        return redirect()->route('report.success');
    }

    public function success()
    {
        return view(view: 'pages.app.report.success');
    }
}
