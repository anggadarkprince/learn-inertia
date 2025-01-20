<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryRepository
{
    public function __construct(private readonly Category $category)
    {
    }

    public function getAll()
    {
        return $this->category->all();
    }

    public function getAllPaginated(Request $request)
    {
        return $this->category->query()
            ->when($request->string('search')->toString(), function($query, $search) {
                $query->where('category', 'LIKE', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate()
            ->withQueryString();
    }

    public function create($data)
    {
        return $this->category->create($data);
    }

    public function update(Category $category, $data): bool
    {
        return $category->fill($data)->save();
    }

    public function delete(Category $category): ?bool
    {
        return $category->delete();
    }
}
