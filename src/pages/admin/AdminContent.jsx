"use client"

import { useState, useEffect } from "react"
import { contentService } from "../../../api"
import AdminLayout from "../../components/admin/AdminLayout"
import React from "react"

export default function AdminContent() {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("hero")
  const [editingContent, setEditingContent] = useState(null)
  const [formData, setFormData] = useState({})
  const [updating, setUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const response = await contentService.getContent()

      if (response.success) {
        setContent(response.data)
      } else {
        setError("Erreur lors du chargement du contenu")
      }
    } catch (err) {
      setError("Erreur lors du chargement du contenu")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (key, data, type) => {
    setEditingContent({ key, type })
    setFormData(JSON.parse(JSON.stringify(data))) // Deep copy
  }

  const handleCancel = () => {
    setEditingContent(null)
    setFormData({})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNestedChange = (e, parent, index, field) => {
    const { value } = e.target
    const newData = { ...formData }

    if (index !== undefined) {
      // Array of objects
      newData[parent][index][field] = value
    } else {
      // Nested object
      if (!newData[parent]) {
        newData[parent] = {}
      }
      newData[parent][field] = value
    }

    setFormData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setUpdating(true)
      const response = await contentService.updateContent(editingContent.key, editingContent.type, formData)

      if (response.success) {
        setUpdateSuccess(true)
        setTimeout(() => setUpdateSuccess(false), 3000)
        fetchContent()
        setEditingContent(null)
      } else {
        setError("Erreur lors de la mise à jour du contenu")
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du contenu")
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  // Helper to render form fields based on content type
  const renderFormFields = () => {
    if (!editingContent) return null

    switch (editingContent.type) {
      case "hero":
        return (
          <>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.title || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                Sous-titre
              </label>
              <input
                type="text"
                name="subtitle"
                id="subtitle"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.subtitle || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="3"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.description || ""}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </>
        )

      case "testimonials":
        return (
          <>
            {formData.testimonials &&
              formData.testimonials.map((testimonial, index) => (
                <div key={index} className="border p-4 rounded-md mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Témoignage {index + 1}</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom</label>
                      <input
                        type="text"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={testimonial.name || ""}
                        onChange={(e) => handleNestedChange(e, "testimonials", index, "name")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rôle</label>
                      <input
                        type="text"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={testimonial.role || ""}
                        onChange={(e) => handleNestedChange(e, "testimonials", index, "role")}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Contenu</label>
                      <textarea
                        rows="3"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={testimonial.content || ""}
                        onChange={(e) => handleNestedChange(e, "testimonials", index, "content")}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )

      default:
        return (
          <div className="bg-yellow-50 p-4 rounded-md">
            <p className="text-yellow-700">
              L'éditeur pour ce type de contenu n'est pas encore implémenté. Veuillez contacter l'administrateur
              système.
            </p>
          </div>
        )
    }
  }

  // Helper to render content preview
  const renderContentPreview = (key, data, type) => {
    switch (type) {
      case "hero":
        return (
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-lg">{data.title || "Titre non défini"}</h3>
            <p className="text-sm text-gray-500">{data.subtitle || "Sous-titre non défini"}</p>
            <p className="mt-2 text-sm">{data.description || "Description non définie"}</p>
          </div>
        )

      case "testimonials":
        return (
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-lg mb-2">Témoignages</h3>
            {data.testimonials && data.testimonials.length > 0 ? (
              <ul className="space-y-2">
                {data.testimonials.map((testimonial, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">{testimonial.name}</span> ({testimonial.role}): "
                    {testimonial.content.substring(0, 50)}..."
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Aucun témoignage défini</p>
            )}
          </div>
        )

      default:
        return (
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Aperçu non disponible pour ce type de contenu</p>
          </div>
        )
    }
  }

  const contentTypes = [
    { id: "hero", name: "Héro" },
    { id: "services", name: "Services" },
    { id: "features", name: "Caractéristiques" },
    { id: "testimonials", name: "Témoignages" },
    { id: "general", name: "Général" },
  ]

  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Gestion du contenu</h1>

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
                <p className="text-sm text-green-700">Contenu mis à jour avec succès</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-blue-500 p-4 mb-6">
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
                <button onClick={fetchContent} className="mt-2 text-sm text-blue-700 underline">
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        )}

        {editingContent ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Modifier le contenu: {editingContent.key}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mt-4">{renderFormFields()}</div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    updating ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {updating ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Content type tabs */}
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Sélectionner un type de contenu
                </label>
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  {contentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                    {contentTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setActiveTab(type.id)}
                        className={`${
                          activeTab === type.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Content list */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Chargement du contenu...</p>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {Object.entries(content)
                    .filter(([_, data]) => data.type === activeTab)
                    .map(([key, data]) => (
                      <li key={key}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">{key}</h3>
                            <button
                              onClick={() => handleEdit(key, data.data, data.type)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Modifier
                            </button>
                          </div>
                          <div className="mt-2">{renderContentPreview(key, data.data, data.type)}</div>
                          <div className="mt-2 text-sm text-gray-500">
                            Dernière mise à jour: {new Date(data.lastUpdated).toLocaleString()}
                          </div>
                        </div>
                      </li>
                    ))}
                  {Object.entries(content).filter(([_, data]) => data.type === activeTab).length === 0 && (
                    <li className="px-4 py-6 text-center">
                      <p className="text-gray-500">Aucun contenu trouvé pour cette section</p>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}
