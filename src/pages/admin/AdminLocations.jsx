"use client"

import { useState, useEffect } from "react"
import { contentService } from "../../../api"
import AdminLayout from "../../components/admin/AdminLayout"
import React from "react"

export default function AdminLocations() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingLocation, setEditingLocation] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    coordinates: [0, 0],
    hours: "",
    specialties: [],
    image: "",
  })
  const [updating, setUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      setLoading(true)
      const response = await contentService.getLocations()

      if (response.success) {
        setLocations(response.data)
      } else {
        setError("Erreur lors du chargement des centres")
      }
    } catch (err) {
      setError("Erreur lors du chargement des centres")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (location) => {
    setEditingLocation(location)
    setFormData({
      id: location.id,
      name: location.name,
      address: location.address,
      phone: location.phone,
      email: location.email,
      coordinates: location.coordinates,
      hours: location.hours,
      specialties: location.specialties,
      image: location.image,
    })
    setIsEditing(true)
  }

  const handleNew = () => {
    setEditingLocation(null)
    setFormData({
      id: `centre-${locations.length + 1}`,
      name: "",
      address: "",
      phone: "",
      email: "",
      coordinates: [31.6, -8.0],
      hours: "",
      specialties: [],
      image: "",
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingLocation(null)
    setFormData({
      id: "",
      name: "",
      address: "",
      phone: "",
      email: "",
      coordinates: [0, 0],
      hours: "",
      specialties: [],
      image: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCoordinateChange = (index, value) => {
    const newCoordinates = [...formData.coordinates]
    newCoordinates[index] = Number.parseFloat(value)
    setFormData({
      ...formData,
      coordinates: newCoordinates,
    })
  }

  const handleSpecialtiesChange = (e) => {
    const specialties = e.target.value.split(",").map((s) => s.trim())
    setFormData({
      ...formData,
      specialties,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setUpdating(true)
      const response = await contentService.updateLocation(formData.id, formData)

      if (response.success) {
        setUpdateSuccess(true)
        setTimeout(() => setUpdateSuccess(false), 3000)
        fetchLocations()
        setIsEditing(false)
      } else {
        setError("Erreur lors de la mise à jour du centre")
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du centre")
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setUpdating(true)
      const response = await contentService.deleteLocation(id)

      if (response.success) {
        fetchLocations()
        setDeleteConfirm(null)
      } else {
        setError("Erreur lors de la suppression du centre")
      }
    } catch (err) {
      setError("Erreur lors de la suppression du centre")
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des centres</h1>
          {!isEditing && (
            <button
              onClick={handleNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Ajouter un centre
            </button>
          )}
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
                <p className="text-sm text-green-700">Centre mis à jour avec succès</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">{error}</p>
                <button onClick={fetchLocations} className="mt-2 text-sm text-blue-700 underline">
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditing ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {editingLocation ? "Modifier le centre" : "Ajouter un centre"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                    Identifiant
                  </label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    required
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.id}
                    onChange={handleInputChange}
                    readOnly={!!editingLocation}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Identifiant unique pour ce centre (ne peut pas être modifié)
                  </p>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom du centre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    required
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    required
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                    Horaires
                  </label>
                  <input
                    type="text"
                    name="hours"
                    id="hours"
                    required
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.hours}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    name="lat"
                    id="lat"
                    required
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.coordinates[0]}
                    onChange={(e) => handleCoordinateChange(0, e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="lng" className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    name="lng"
                    id="lng"
                    required
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.coordinates[1]}
                    onChange={(e) => handleCoordinateChange(1, e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
                    Spécialités (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    name="specialties"
                    id="specialties"
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.specialties.join(", ")}
                    onChange={handleSpecialtiesChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    URL de l'image
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                    updating ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {updating ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des centres...</p>
            </div>
          </div>
        ) : locations.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {locations.map((location) => (
                <li key={location.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">{location.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{location.name}</h3>
                          <p className="text-sm text-gray-500">{location.address}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(location)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(location.id)}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          {location.phone}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          {location.email}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {location.hours}
                      </div>
                    </div>

                    {/* Delete confirmation */}
                    {deleteConfirm === location.id && (
                      <div className="mt-4 bg-red-50 p-4 rounded-md">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                              Êtes-vous sûr de vouloir supprimer ce centre ?
                            </h3>
                            <div className="mt-2 flex space-x-3">
                              <button
                                type="button"
                                onClick={() => handleDelete(location.id)}
                                disabled={updating}
                                className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                                  updating ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                              >
                                {updating ? "Suppression..." : "Confirmer"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirm(null)}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-500">Aucun centre trouvé</p>
            <button
              onClick={handleNew}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Ajouter un centre
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
