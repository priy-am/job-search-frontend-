'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  fetchCategoriesFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from '@/redux/slices/categorySlice'

export default function useGetAllCategories() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getCategories = async () => {
      try {
        dispatch(fetchCategoriesStart())

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CATEGORIES_END_POINT}/getCategory`
        )
        const data = await res.json()
console.log(data, "data")
        dispatch(fetchCategoriesSuccess(data || []))
      } catch (error) {
        console.error("Error in useGetAllCategories:", error)
        dispatch(fetchCategoriesFailure("Error fetching categories"))
      }
    }

    getCategories()
  }, [dispatch])
}
