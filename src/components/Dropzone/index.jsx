// Import des dépendances et du style
import "./dropzone.scss";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ setPictures }) => {
  // State pour stocker les prévisualisations des images sélectionnées
  const [previewImages, setPreviewImages] = useState([]);

  // Fonction appelée lors du dépôt de fichiers dans la zone de dépôt
  const onDrop = useCallback((acceptedFiles) => {
    // Limite la sélection à 6 fichiers
    acceptedFiles = acceptedFiles.slice(0, 6);

    // Crée des objets de prévisualisation pour chaque fichier accepté
    const imagePreviews = acceptedFiles.map((file) => {
      console.log(file);
      return {
        src: URL.createObjectURL(file), // URL de prévisualisation de l'image
        file, // Fichier d'image lui-même
      };
    });
    // Met à jour le state avec les nouvelles prévisualisations d'images
    setPreviewImages((prev) => [...prev, ...imagePreviews]);
    setPictures(acceptedFiles);
  }, []);

  // Validateur de fichiers pour la zone de dépôt
  const fileValidator = (file) => {
    // Vérifie si le nombre d'images sélectionnées dépasse la limite
    if (previewImages.length >= 6) {
      return {
        code: "too-many-images",
        message: "Vous ne pouvez sélectionner que 6 images au maximum.",
      };
    }
    return null;
  };

  // Configuration de la zone de dépôt
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      validator: fileValidator,
    });

  // Fonction pour supprimer une image sélectionnée
  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Rendu du composant
  return (
    <div>
      <div {...getRootProps()} className="zoneDrop">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposez les images ici...</p>
        ) : (
          <p>
            Cliquez ici ou faites glisser et déposez des images pour les
            uploader.
          </p>
        )}
      </div>
      <div className="previewZone">
        {/* Affiche les prévisualisations d'images */}
        {previewImages.map((image, index) => (
          <div key={index} className="divPreview">
            <img
              src={image.src}
              alt={`Aperçu de ${index}`}
              className="previews"
            />
            {/* Ajoute l'icône de suppression pour chaque image */}
            <span onClick={() => removeImage(index)} className="deleteIcon">
              ×
            </span>
          </div>
        ))}
      </div>
      {/* Affiche les erreurs de validation des fichiers */}
      {fileRejections.map(({ file, errors }) => (
        <div key={file.path}>
          {errors.map((e) => (
            <p className="errorMessage" key={e.code}>
              {e.message}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
