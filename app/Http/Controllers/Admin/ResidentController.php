<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResidentRequest;
use App\Http\Requests\UpdateResidentRequest;
use App\Interfaces\ResidentRepositoryInterface;
use RealRashid\SweetAlert\Facades\Alert as Swal;

class ResidentController extends Controller
{
    private ResidentRepositoryInterface $residentRepository;

    public function __construct(ResidentRepositoryInterface $residentRepository)
    {
        $this->residentRepository = $residentRepository;
    }
    public function index()
    {
        $residents = $this->residentRepository->getAllResidents();
        return view('pages.admin.resident.index', compact('residents'));
    }

    public function create()
    {
        return view('pages.admin.resident.create');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResidentRequest $request)
    {

        $data = $request->validated();

        $data['avatar'] = $request->file('avatar')->store('assets/avatar', 'public');

        $this->residentRepository->createResident($data);

        Swal::toast('Data Masyarakat berhasil ditambahkan', 'Success')->timerProgressBar();

        return redirect()->route('admin.residents.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $resident = $this->residentRepository->getResidentById($id);

        return view('pages.admin.resident.show', compact('resident'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
       $resident = $this->residentRepository->getResidentById($id);

        return view('pages.admin.resident.edit', compact('resident'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResidentRequest $request, string $id)
    {
        $data = $request->validated();

        if ($request->avatar) {
            $data['avatar'] = $request->file('avatar')->store('assets/avatar', 'public');
        }

        $this->residentRepository->updateResident($data, $id);

        Swal::toast('Data Masyarakat berhasil diupdate', 'Success')->timerProgressBar();

        return redirect()->route('admin.residents.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $_id)
    {
        $this->residentRepository->deleteResident($_id);

        Swal::toast('Data Masyarakat berhasil dihapus', 'Success')->timerProgressBar();

        return redirect()->route('admin.residents.index');
    }
}