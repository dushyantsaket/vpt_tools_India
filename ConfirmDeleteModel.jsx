
import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const API_URL = "http://localhost:4000/api/files";

export default function FileList({ files, setFiles }) {
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDelete = async (item) => {
    if (!item?._id) {
      setError("Invalid file selected.");
      return;
    }

    if (isDeleting) return;

    setIsDeleting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/${item._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete file."
        );
      }

      // Remove deleted file from UI
      setFiles((prevFiles) =>
        prevFiles.filter(
          (file) => file._id !== item._id
        )
      );

      setSuccess(
        `${item.name || "File"} deleted successfully.`
      );

      setDeleteItem(null);
    } catch (err) {
      console.error("Delete error:", err);

      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {/* Success Message */}
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* File List */}
      {files.map((file) => (
        <div key={file._id} className="file-item">
          <span>{file.name}</span>

          <button
            type="button"
            onClick={() => {
              setError("");
              setSuccess("");
              setDeleteItem(file);
            }}
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        item={deleteItem}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!isDeleting) {
            setDeleteItem(null);
            setError("");
          }
        }}
      />
    </div>
  );
}
