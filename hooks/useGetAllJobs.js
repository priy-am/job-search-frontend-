"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchJobSuccess, fetchJobsFailure, fetchJobsStart } from "@/redux/slices/allJobsSlice";




export default function useGetAllJobs () {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        dispatch(fetchJobsStart())

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_JOBPOST_END_POINT}/getAllJobPosts`
        );
        const data = await res.json();
        dispatch(fetchJobSuccess(data?.jobPosts || []  ))
        console.log("in hook", data)
      } catch (error) {
        console.error("Error fetching job posts:", error);
        dispatch(fetchJobsFailure("Error fetching All jobs"))
      }
    };
    fetchJobPosts();
  }, []);
}


