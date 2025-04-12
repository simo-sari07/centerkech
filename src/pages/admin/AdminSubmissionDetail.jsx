"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { formService } from "../../../api"
import AdminLayout from "../../components/admin/AdminLayout"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import React from "react"

export default function AdminSubmissionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusUpdate, setStatusUpdate] = useState({
    status: "",
    notes: "",
  })
  const [updating, setUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        setLoading(true)
        const response = await formService.getSubmission(id)

        if (response.success) {
          setSubmission(response.data)
          setStatusUpdate({
            status: response.data.status,
            notes: response.data.notes || "",
          })
        } else {
          setError("Erreur lors du chargement des données")
        }
      } catch (err) {
        setError("Erreur lors du chargement des données")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmission()
  }, [id])

  const handleStatusUpdate = async (e) => {
    e.preventDefault()
    try {
      setUpdating(true)
      const response = await formService.updateStatus(id, statusUpdate.status, statusUpdate.notes)

      if (response.success) {
        setSubmission(response.data)
        setUpdateSuccess(true)
        setTimeout(() => setUpdateSuccess(false), 3000)
      } else {
        setError("Erreur lors de la mise à jour du statut")
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut")
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      setUpdating(true)
      const response = await formService.deleteSubmission(id)

      if (response.success) {
        navigate("/sariadmin/submissions")
      } else {
        setError("Erreur lors de la suppression")
      }
    } catch (err) {
      setError("Erreur lors de la suppression")
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: fr })
    } catch (error) {
      return dateString
    }
  }

  // Get source text in French
  const getSourceText = (source) => {
    switch (source) {
      case "join":
        return "Rejoignez-nous"
      case "contact":
        return "Contact"
      case "services":
        return "Services"
      default:
        return source
    }
  }

  // Get formation text in French
  const getFormationText = (formation) => {
    switch (formation) {
      case "soutien":
        return "Cours de soutien scolaire"
      case "langues":
        return "Langues et communication"
      case "concours":
        return "Préparation Aux concours"
      case "coaching":
        return "Coaching scolaire et orientation"
      case "formation":
        return "Formation continue"
      case "development":
        return "Développement personnel"
      default:
        return formation
    }
  }

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

  if (!submission) {
    return (
      <AdminLayout>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">Inscription non trouvée</p>
              <button
                onClick={() => navigate("/sariadmin/submissions")}
                className="mt-2 text-sm text-yellow-700 underline"
              >
                Retour à la liste
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Détails de l'inscription</h1>
          <button
            onClick={() => navigate("/sariadmin/submissions")}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Retour à la liste
          </button>
        </div>

        {updateSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">Statut mis à jour avec succès</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Informations personnelles</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Détails du contact et de la demande</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{submission.name}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a href={`mailto:${submission.email}`} className="text-blue-600 hover:text-blue-800">
                    {submission.email}
                  </a>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a href={`tel:${submission.tel}`} className="text-blue-600 hover:text-blue-800">
                    {submission.tel}
                  </a>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Formation</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {getFormationText(submission.formation)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Source</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{getSourceText(submission.source)}</dd>
              </div>
              {submission.message && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Message</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{submission.message}</dd>
                </div>
              )}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date de soumission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatDate(submission.createdAt)}</dd>
              </div>
              {submission.contactedAt && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date de contact</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {formatDate(submission.contactedAt)}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Mise à jour du statut</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Modifier le statut de cette inscription</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleStatusUpdate}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Statut
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={statusUpdate.status}
                    onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                  >
                    <option value="pending">En attente</option>
                    <option value="contacted">Contacté</option>
                    <option value="enrolled">Inscrit</option>
                    <option value="rejected">Rejeté</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes (optionnel)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ajoutez des notes concernant cette inscription"
                    value={statusUpdate.notes}
                    onChange={(e) => setStatusUpdate({ ...statusUpdate, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={updating}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    updating ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {updating ? "Mise à jour..." : "Mettre à jour le statut"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Supprimer cette inscription</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Cette action est irréversible. Toutes les données seront définitivement supprimées.</p>
            </div>
            <div className="mt-5">
              {deleteConfirm ? (
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={updating}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      updating ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {updating ? "Suppression..." : "Confirmer la suppression"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Supprimer l'inscription
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
