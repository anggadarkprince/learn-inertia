<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;

class CategoryService
{
    public function __construct(private readonly CategoryRepository $categoryRepository)
    {
    }

    public function getAll()
    {
        return $this->categoryRepository->getAll();
    }

    public function getAllPaginated(Request $request)
    {
        return $this->categoryRepository->getAllPaginated($request);
    }

    public function create(array $data)
    {
        return $this->categoryRepository->create($data);
    }

    public function update(Category $category, array $data): bool
    {
        return $this->categoryRepository->update($category, $data);
    }

    public function delete(Category $category): ?bool
    {
        return $this->categoryRepository->delete($category);
    }
}
