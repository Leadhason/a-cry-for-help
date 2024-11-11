'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, X } from 'lucide-react'

const ProductFilters = ({ products, onFilterChange }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    categories: [],
    tags: [],
    priceRange: {
      min: 0,
      max: 10000
    }
  })
  
  const [isOpen, setIsOpen] = useState({
    brand: false,
    category: false,
    tag: false,
    price: false
  })

  const [filterCount, setFilterCount] = useState(0)

  const brands = [...new Set(products.map(p => p.brand))]
  const categories = [...new Set(products.map(p => p.category))]
  const tags = [...new Set(products.flatMap(p => p.tags || []))]

  useEffect(() => {
    const count = activeFilters.brands.length + 
                  activeFilters.categories.length + 
                  activeFilters.tags.length +
                  (activeFilters.priceRange.min > 0 || activeFilters.priceRange.max < 10000 ? 1 : 0)
    setFilterCount(count)
  }, [activeFilters])

  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const updateUrl = useCallback(debounce((filters) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (filters.brands.length) params.set('brands', filters.brands.join(','))
    else params.delete('brands')
    
    if (filters.categories.length) params.set('categories', filters.categories.join(','))
    else params.delete('categories')
    
    if (filters.tags.length) params.set('tags', filters.tags.join(','))
    else params.delete('tags')
    
    if (filters.priceRange.min > 0) params.set('minPrice', filters.priceRange.min.toString())
    else params.delete('minPrice')
    
    if (filters.priceRange.max < 10000) params.set('maxPrice', filters.priceRange.max.toString())
    else params.delete('maxPrice')

    router.push(`?${params.toString()}`)
  }, 300), [router, searchParams])

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev }
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter(item => item !== value)
      } else {
        newFilters[type] = [...newFilters[type], value]
      }
      updateUrl(newFilters)
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const updatePriceRange = (min, max) => {
    setActiveFilters(prev => {
      const newFilters = {
        ...prev,
        priceRange: { min, max }
      }
      updateUrl(newFilters)
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const resetFilters = () => {
    const newFilters = {
      brands: [],
      categories: [],
      tags: [],
      priceRange: {
        min: 0,
        max: 10000
      }
    }
    setActiveFilters(newFilters)
    router.push(window.location.pathname)
    onFilterChange(newFilters)
  }

  return (
    <div className="w-full py-2 px-3 sm:ml-20">
      <div className="flex flex-wrap gap-2 items-center">
        {/* Brand Filter */}
        <div className="relative text-light">
          <button
            onClick={() => setIsOpen(prev => ({ ...prev, brand: !prev.brand }))}
            className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            Brand
            <ChevronDown className="w-4 h-4" />
          </button>
          {isOpen.brand && (
            <div className="absolute top-full left-0 mt-2 w-30 bg-white rounded-lg shadow-lg p-4 z-50">
              {brands.map(brand => (
                <label key={brand} className="flex text-sm font-extralight items-center gap-2 py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.brands.includes(brand)}
                    onChange={() => toggleFilter('brands', brand)}
                    className="rounded border-gray-300"
                  />
                  {brand}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(prev => ({ ...prev, category: !prev.category }))}
            className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            Category
            <ChevronDown className="w-4 h-4" />
          </button>
          {isOpen.category && (
            <div className="absolute top-full left-0 mt-2 w-30 bg-white rounded-lg shadow-lg p-4 z-50">
              {categories.map(category => (
                <label key={category} className="flex text-sm font-extralight text-black items-center gap-2 py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.categories.includes(category)}
                    onChange={() => toggleFilter('categories', category)}
                    className="rounded border-gray-300"
                  />
                  {category}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Tag Filter */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(prev => ({ ...prev, tag: !prev.tag }))}
            className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            Tag
            <ChevronDown className="w-4 h-4" />
          </button>
          {isOpen.tag && (
            <div className="absolute top-full left-0 mt-2 w-30 bg-white rounded-lg shadow-lg p-4 z-50">
              {tags.map(tag => (
                <label key={tag} className="flex text-sm font-extralight items-center gap-2 py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.tags.includes(tag)}
                    onChange={() => toggleFilter('tags', tag)}
                    className="rounded border-gray-300"
                  />
                  {tag}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(prev => ({ ...prev, price: !prev.price }))}
            className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            Price Range
            <ChevronDown className="w-4 h-4" />
          </button>
          {isOpen.price && (
            <div className="absolute top-full left-0 mt-2 w-30 bg-white rounded-lg shadow-lg p-4 z-50">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-extralight text-gray-600">Min Price (GHS)</label>
                  <input
                    type="number"
                    value={activeFilters.priceRange.min}
                    onChange={(e) => updatePriceRange(Number(e.target.value), activeFilters.priceRange.max)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-extralight text-gray-600">Max Price (GHS)</label>
                  <input
                    type="number"
                    value={activeFilters.priceRange.max}
                    onChange={(e) => updatePriceRange(activeFilters.priceRange.min, Number(e.target.value))}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filter Count & Reset */}
        {filterCount > 0 && (
          <button
            onClick={resetFilters}
            className="ml-auto px-4 py-2 bg-gray-100 rounded-full flex text-black items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            Reset filters
            <span className="flex items-center justify-center w-5 h-5 bg-gray-100 text-black  text-xs rounded-full">
              {filterCount}
            </span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {filterCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {activeFilters.brands.map(brand => (
            <span
              key={brand}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
            >
              {brand}
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() => toggleFilter('brands', brand)}
              />
            </span>
          ))}
          {activeFilters.categories.map(category => (
            <span
              key={category}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
            >
              {category}
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() => toggleFilter('categories', category)}
              />
            </span>
          ))}
          {activeFilters.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
            >
              {tag}
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() => toggleFilter('tags', tag)}
              />
            </span>
          ))}
          {(activeFilters.priceRange.min > 0 || activeFilters.priceRange.max < 10000) && (
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
              GHS {activeFilters.priceRange.min} - GHS {activeFilters.priceRange.max}
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() => updatePriceRange(0, 10000)}
              />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductFilters