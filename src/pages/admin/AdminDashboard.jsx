"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { adminService } from "../../../api"
import AdminLayout from "../../components/admin/AdminLayout"
import DashboardStats from "../../components/admin/DashboardStats"
import SubmissionTable from "./SubmissionTable"

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentSubmissions, setRecentSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await adminService.getDashboardStats()

        if (response.success) {
          setStats(response.data.stats)
          setRecentSubmissions(response.data.recentSubmissions)
        } else {
          setError("Erreur lors du chargement des données du tableau de bord")
        }
      } catch (err) {
        setError("Erreur lors du chargement des données du tableau de bord")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des données...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-blue-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-2 text-sm text-blue-700 underline">
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Tableau de bord</h1>

        {/* Stats Cards */}
        {stats && <DashboardStats stats={stats} />}

        {/* Recent Submissions */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Inscriptions récentes</h2>
            <Link to="/sariadmin/submissions" className="text-sm text-blue-600 hover:text-blue-800">
              Voir toutes les inscriptions
            </Link>
          </div>

          {recentSubmissions && recentSubmissions.length > 0 ? (
            <SubmissionTable submissions={recentSubmissions} />
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-gray-500">Aucune inscription récente</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
