<?php

namespace App\Repositories;

use App\Interfaces\ResidentRepositoryInterface;
use App\Models\Resident; // Assuming you have a Resident model
use App\Models\User; // Assuming you have a User model

class ResidentRepository implements ResidentRepositoryInterface
{
    public function getAllResidents()
    {
        return Resident::all(); 
    }

    public function getResidentById(int $id)
    {
        return Resident::where('id', $id)->first();
    }

    public function createResident(array $data)
    {
       $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password'])
       ]);

       $user->assignRole('resident'); // Assign the 'resident' role to the user

       return $user->resident()->create($data);
    }

    public function updateResident(array $data, int $id)
    {
        $resident = $this->getResidentById($id);

        $resident->user->update([
            'name' => $data['name'],
            'password' => isset($data['password']) ? bcrypt($data['password']) : $resident->user->password
        ]);

        return $resident->update($data);
    }

    public function deleteResident(int $id)
    {
        $resident = $this->getResidentById($id);

        $resident->user()->delete(); // Delete the associated user

        return $resident->delete();
    }
}