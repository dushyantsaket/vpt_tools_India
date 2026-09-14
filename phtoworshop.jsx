// import React, { useState, useEffect, useRef } from 'react';
// import { UploadCloud, Trash2, Copy, FileText, Image as ImageIcon, Link as LinkIcon, RefreshCw } from 'lucide-react';

// const API = '/api';

// export default function PhotosWorkspace({ token }) {
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     fetchMedia();
//   }, [token]);

//   const fetchMedia = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/media`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setMedia(data);
//       }
//     } catch (err) {
//       console.error('Error fetching media', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpload = async (event) => {
//     const files = event.target.files;
//     if (!files || files.length === 0) return;

//     setUploading(true);
//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       formData.append('files', files[i]);
//     }

//     try {
//       const res = await fetch(`${API}/media`, {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       if (res.ok) {
//         // Refresh list
//         fetchMedia();
//       } else {
//         alert('Upload failed');
//       }
//     } catch (err) {
//       console.error('Error uploading files', err);
//       alert('Upload failed');
//     } finally {
//       setUploading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this file?')) return;

//     try {
//       const res = await fetch(`${API}/media/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.ok) {
//         setMedia(prev => prev.filter(m => m._id !== id));
//       } else {
//         alert('Failed to delete file');
//       }
//     } catch (err) {
//       console.error('Error deleting file', err);
//       alert('Failed to delete file');
//     }
//   };

//   const handleCopyLink = (url) => {
//     navigator.clipboard.writeText(url);
//     alert('Link copied to clipboard!');
//   };

//   const formatSize = (bytes) => {
//     if (bytes < 1024) return bytes + ' B';
//     else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
//     else return (bytes / 1048576).toFixed(1) + ' MB';
//   };

//   const isImage = (mimeType) => mimeType.startsWith('image/');

//   return (
//     <div className="im-page im-photos-page" style={{ padding: '24px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>

//       {/* Header section inspired by IndiaMART MyDrive */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
//         <div>
//           <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: '0 0 8px 0' }}>My Photos & Documents</h1>
//           <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>All your photos and documents at one place!</p>
//         </div>

//         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//           <button
//             onClick={() => fetchMedia()}
//             style={{ padding: '8px', background: 'none', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
//             title="Refresh"
//           >
//             <RefreshCw size={18} />
//           </button>

//           <label style={{
//             background: '#00a699', color: '#fff', padding: '10px 24px', borderRadius: '4px',
//             cursor: uploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold'
//           }}>
//             <UploadCloud size={20} />
//             {uploading ? 'Uploading...' : 'Select File'}
//             <input
//               type="file"
//               multiple
//               onChange={handleUpload}
//               style={{ display: 'none' }}
//               disabled={uploading}
//               ref={fileInputRef}
//             />
//           </label>
//           <span style={{ fontSize: '12px', color: '#888' }}>or <strong>Drag & Drop</strong> files</span>
//         </div>
//       </div>

//       {/* Main content area */}
//       <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eee', padding: '24px' }}>
//         <h2 style={{ fontSize: '18px', margin: '0 0 20px 0', color: '#333' }}>All files ({media.length})</h2>

//         {loading ? (
//           <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Loading files...</div>
//         ) : media.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: '60px 20px', border: '2px dashed #ddd', borderRadius: '8px' }}>
//             <ImageIcon size={48} color="#ccc" style={{ marginBottom: '16px' }} />
//             <h3 style={{ margin: '0 0 8px 0', color: '#555' }}>No files found</h3>
//             <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>Upload images and documents to manage them here.</p>
//           </div>
//         ) : (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
//             {media.map((item) => (
//               <div key={item._id} style={{
//                 border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden',
//                 boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column'
//               }}>
//                 {/* File Preview */}
//                 <div style={{ height: '160px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #eee' }}>
//                   {isImage(item.mimeType) ? (
//                     <img src={item.url} alt={item.originalName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                   ) : (
//                     <FileText size={48} color="#999" />
//                   )}
//                 </div>

//                 {/* File Details */}
//                 <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
//                   <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.originalName}>
//                     {item.originalName}
//                   </p>
//                   <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#888' }}>
//                     {formatSize(item.size)} • {new Date(item.createdAt).toLocaleDateString()}
//                   </p>

//                   {/* Actions */}
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
//                     <button
//                       onClick={() => handleCopyLink(item.url)}
//                       style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00a699', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: 0 }}
//                     >
//                       <LinkIcon size={14} /> Copy Link
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: 0 }}
//                     >
//                       <Trash2 size={14} /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  UploadCloud,
  Trash2,
  Copy,
  FileText,
  Image as ImageIcon,
  RefreshCw,
  FolderPlus,
  Folder,
  Search,
  X,
  Download,
  Edit2,
  Star,
  StarOff,
  Eye,
  RotateCw,
  Archive,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  HardDrive,
  File,
  FileImage,
  FileSpreadsheet,
  FileArchive, // ← FilePdf हटाया
  MoreVertical,
  EyeOff,
  Lock,
  Unlock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "/api";

export default function PhotosWorkspace({ token }) {
  const navigate = useNavigate();

  // ---------- State ----------
  const [media, setMedia] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState(null); // null = root
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, image, pdf, etc.
  const [showRecycleBin, setShowRecycleBin] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDragging, setIsDragging] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  // const [showFileActions, setShowFileActions] = useState(null); // file id
  // const [editingFile, setEditingFile] = useState(null); // { id, newName }
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const fileInputRef = useRef(null);
  const filterByCard = (filter) => {
    setSelectedFolder(null);
    setShowRecycleBin(false);
    setActiveFilter(filter);
    if (filter === "all" || filter === "favourites") {
      setFilterType("all");
    } else {
      setFilterType(filter);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchMedia();
    }
  };
  // const navigate = useNavigate(); // already imported

  // ---------- Auth Check ----------
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin-login");
      return;
    }
    // Token passed as prop – you may also verify with backend
  }, [navigate]);

  // ---------- Data Fetching ----------
  const fetchFolders = useCallback(async () => {
    try {
      const res = await fetch(`${API}/folders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFolders(data);
      } else {
        // fallback: empty folder list
        setFolders([]);
      }
    } catch {
      setFolders([]);
    }
  }, [token]);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API}/media?`;
      if (selectedFolder)
        url += `folderId=${encodeURIComponent(selectedFolder)}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
      const activeType =
        activeFilter && activeFilter !== "all" && activeFilter !== "favourites"
          ? activeFilter
          : filterType;
      if (activeType && activeType !== "all")
        url += `type=${encodeURIComponent(activeType)}&`;
      if (showRecycleBin) url += `deleted=true&`;
      if (activeFilter === "favourites") url += `favourite=true&`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMedia(data);
      } else {
        setMedia([]);
      }
    } catch (err) {
      console.error("Error fetching media", err);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  }, [
    token,
    selectedFolder,
    searchQuery,
    filterType,
    showRecycleBin,
    activeFilter,
  ]);

  // Load initial data
  useEffect(() => {
    fetchFolders();
    fetchMedia();
  }, [fetchFolders, fetchMedia]);

  // ---------- Folder Operations ----------
  const createFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const res = await fetch(`${API}/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newFolderName, parentId: selectedFolder }),
      });
      if (res.ok) {
        const data = await res.json();
        setFolders([...folders, data]);
        setNewFolderName("");
        setShowCreateFolder(false);
      } else {
        alert("Failed to create folder");
      }
    } catch {
      alert("Error creating folder");
    }
  };

  const deleteFolder = async (folderId) => {
    if (!window.confirm("Delete this folder and all its files?")) return;
    try {
      const res = await fetch(`${API}/folders/${folderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setFolders(folders.filter((f) => f._id !== folderId));
        if (selectedFolder === folderId) setSelectedFolder(null);
      } else {
        alert("Failed to delete folder");
      }
    } catch {
      alert("Error deleting folder");
    }
  };

  // ---------- File Upload ----------
  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    if (selectedFolder) {
      formData.append("folderId", selectedFolder);
    }

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API}/media`, true);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress(100);
          fetchMedia();
          setUploading(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
          alert("Upload failed");
          setUploading(false);
        }
      };

      xhr.onerror = () => {
        alert("Upload error");
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      alert("Upload error");
      setUploading(false);
    }
  };

  const handleUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    uploadFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;
    uploadFiles(files);
  };

  // ---------- File Actions ----------
  const deleteFile = async (id) => {
    if (!window.confirm("Move to Recycle Bin?")) return;
    try {
      const res = await fetch(`${API}/media/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMedia(media.filter((m) => m._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Error deleting");
    }
  };

  const restoreFile = async (id) => {
    try {
      const res = await fetch(`${API}/media/${id}/restore`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMedia(media.filter((m) => m._id !== id));
      } else {
        alert("Restore failed");
      }
    } catch {
      alert("Error restoring");
    }
  };

  const toggleFavourite = async (id, current) => {
    try {
      const res = await fetch(`${API}/media/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isFavourite: !current }),
      });
      if (res.ok) {
        setMedia(
          media.map((m) =>
            m._id === id ? { ...m, isFavourite: !current } : m,
          ),
        );
      }
    } catch {
      alert("Error toggling favourite");
    }
  };

  const renameFile = async (id, newName) => {
    if (!newName.trim()) return;
    try {
      const res = await fetch(`${API}/media/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ originalName: newName }),
      });
      if (res.ok) {
        setMedia(
          media.map((m) =>
            m._id === id ? { ...m, originalName: newName } : m,
          ),
        );
      } else {
        alert("Rename failed");
      }
    } catch {
      alert("Error renaming");
    }
  };

  const downloadFile = (url) => {
    window.open(url, "_blank");
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  // ---------- Helper Functions ----------
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const isImage = (mimeType) => mimeType.startsWith("image/");
  const isVideo = (mimeType) => mimeType.startsWith("video/");
  const isPDF = (mimeType) => mimeType === "application/pdf";
  const isSpreadsheet = (mimeType) =>
    mimeType.includes("spreadsheet") || mimeType.includes("excel");

  const openFile = (item) => {
    if (isImage(item.mimeType) || isVideo(item.mimeType)) {
      setPreviewFile(item);
      return;
    }
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  // Compute stats
  const totalFiles = media.length;
  const totalImages = media.filter((m) => isImage(m.mimeType)).length;
  const totalPDFs = media.filter((m) => isPDF(m.mimeType)).length;
  const totalExcel = media.filter((m) => isSpreadsheet(m.mimeType)).length;
  const totalSize = media.reduce((sum, m) => sum + m.size, 0);
  const favouriteCount = media.filter((m) => m.isFavourite).length;

  // ---------- UI ----------
  return (
    <div
      className="photos-workspace"
      style={{
        padding: "24px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Toast / Notification can be added here */}

      {/* ---------- Dashboard Stats Cards ---------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <StatCard
          label="Total Files"
          value={totalFiles}
          icon={<File size={20} />}
          color="#3b82f6"
          active={activeFilter === "all"}
          onClick={() => filterByCard("all")}
        />
        <StatCard
          label="Images"
          value={totalImages}
          icon={<FileImage size={20} />}
          color="#10b981"
          active={activeFilter === "image"}
          onClick={() => filterByCard("image")}
        />
        <StatCard
          label="PDFs"
          value={totalPDFs}
          icon={<FileText size={20} />}
          color="#ef4444"
          active={activeFilter === "pdf"}
          onClick={() => filterByCard("pdf")}
        />
        <StatCard
          label="Excel"
          value={totalExcel}
          icon={<FileSpreadsheet size={20} />}
          color="#f59e0b"
          active={activeFilter === "spreadsheet"}
          onClick={() => filterByCard("spreadsheet")}
        />
        <StatCard
          label="Favourites"
          value={favouriteCount}
          icon={<Star size={20} />}
          color="#8b5cf6"
          active={activeFilter === "favourites"}
          onClick={() => filterByCard("favourites")}
        />
        <StatCard
          label="Storage"
          value={formatSize(totalSize)}
          icon={<HardDrive size={20} />}
          color="#6b7280"
        />
      </div>

      {/* ---------- Toolbar ---------- */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Search */}
        <div
          style={{
            flex: 1,
            minWidth: "200px",
            display: "flex",
            alignItems: "center",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "4px 12px",
            background: "#f9fafb",
          }}
        >
          <Search size={18} color="#6b7280" />
          <input
            type="text"
            placeholder="Search files, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            style={{
              border: "none",
              background: "transparent",
              padding: "8px 10px",
              flex: 1,
              outline: "none",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <X size={16} color="#6b7280" />
            </button>
          )}
        </div>

        {/* Filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: "white",
          }}
        >
          <option value="all">All Types</option>
          <option value="image">Images</option>
          <option value="pdf">PDF</option>
          <option value="spreadsheet">Excel</option>
          <option value="archive">Archive</option>
        </select>

        {/* Recycle Bin Toggle */}
        <button
          onClick={() => setShowRecycleBin(!showRecycleBin)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: showRecycleBin ? "#ef4444" : "#e5e7eb",
            color: showRecycleBin ? "white" : "#374151",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {showRecycleBin ? "🗑 Recycle Bin" : "Recycle Bin"}
        </button>

        {/* View Mode */}
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          style={{
            background: "none",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          {viewMode === "grid" ? <List size={20} /> : <Grid size={20} />}
        </button>

        {/* Refresh */}
        <button
          onClick={() => {
            fetchFolders();
            fetchMedia();
          }}
          style={{
            background: "none",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* ---------- Main Area: Folders + Files ---------- */}
      <div style={{ display: "flex", gap: "24px" }}>
        {/* Left Sidebar - Folders */}
        <div
          style={{
            width: "250px",
            flexShrink: 0,
            background: "white",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              📂 Folders
            </h3>
            <button
              onClick={() => setShowCreateFolder(true)}
              style={{
                background: "#3b82f6",
                border: "none",
                color: "white",
                padding: "4px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              + New
            </button>
          </div>

          {/* Root folder */}
          <div
            onClick={() => setSelectedFolder(null)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "4px",
              background: selectedFolder === null ? "#e5e7eb" : "transparent",
              fontWeight: selectedFolder === null ? "600" : "normal",
            }}
          >
            📁 All Files
          </div>

          {folders.map((folder) => (
            <div
              key={folder._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 0",
              }}
            >
              <div
                onClick={() => setSelectedFolder(folder._id)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background:
                    selectedFolder === folder._id ? "#e5e7eb" : "transparent",
                  fontWeight: selectedFolder === folder._id ? "600" : "normal",
                }}
              >
                📁 {folder.name}
              </div>
              <button
                onClick={() => deleteFolder(folder._id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {folders.length === 0 && (
            <p style={{ color: "#9ca3af", fontSize: "13px" }}>No folders yet</p>
          )}
        </div>

        {/* Right - Files Area */}
        <div
          style={{
            flex: 1,
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          {/* Upload Area */}
          <div style={{ marginBottom: "20px" }}>
            <div
              role="button"
              tabIndex={uploading ? -1 : 0}
              onClick={() => !uploading && fileInputRef.current?.click()}
              onKeyDown={(event) => {
                if ((event.key === "Enter" || event.key === " ") && !uploading) {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              onDragEnter={handleDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                border: "2px dashed #d1d5db",
                borderRadius: "12px",
                cursor: uploading ? "not-allowed" : "pointer",
                background: uploading
                  ? "#f3f4f6"
                  : isDragging
                    ? "#e0f2fe"
                    : "#fafafa",
                transition: "background 0.2s",
              }}
            >
              <UploadCloud
                size={32}
                color={uploading ? "#9ca3af" : "#3b82f6"}
              />
              <p style={{ margin: "8px 0 4px", fontWeight: "500" }}>
                {uploading
                  ? `Uploading... ${uploadProgress}%`
                  : "Click to upload or drag & drop"}
              </p>
              {uploading && (
                <div
                  style={{
                    width: "80%",
                    maxWidth: "300px",
                    height: "6px",
                    background: "#e5e7eb",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${uploadProgress}%`,
                      height: "100%",
                      background: "#3b82f6",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              )}
              <input
                type="file"
                multiple
                onChange={handleUpload}
                style={{ display: "none" }}
                ref={fileInputRef}
                disabled={uploading}
              />
            </div>
          </div>

          {/* File List */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
                {showRecycleBin
                  ? "🗑 Recycle Bin"
                  : `📄 Files (${media.length})`}
              </h3>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                {formatSize(totalSize)} used
              </span>
            </div>

            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#9ca3af",
                }}
              >
                Loading...
              </div>
            ) : media.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  border: "1px dashed #e5e7eb",
                  borderRadius: "8px",
                  color: "#9ca3af",
                }}
              >
                {showRecycleBin
                  ? "Recycle bin is empty"
                  : "No files found. Upload your first file!"}
              </div>
            ) : viewMode === "grid" ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "16px",
                }}
              >
                {media.map((item) => (
                  <FileCard
                    key={item._id}
                    item={item}
                    isImage={isImage}
                    formatSize={formatSize}
                    onDelete={deleteFile}
                    onRestore={restoreFile}
                    onToggleFavourite={toggleFavourite}
                    onRename={renameFile}
                    onDownload={downloadFile}
                    onCopyLink={copyLink}
                    onOpen={openFile}
                    showRecycleBin={showRecycleBin}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {media.map((item) => (
                  <FileRow
                    key={item._id}
                    item={item}
                    isImage={isImage}
                    formatSize={formatSize}
                    onDelete={deleteFile}
                    onRestore={restoreFile}
                    onToggleFavourite={toggleFavourite}
                    onRename={renameFile}
                    onDownload={downloadFile}
                    onCopyLink={copyLink}
                    onOpen={openFile}
                    showRecycleBin={showRecycleBin}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Create Folder Modal ---------- */}
      {showCreateFolder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              width: "360px",
              maxWidth: "90%",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Create New Folder</h3>
            <input
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowCreateFolder(false)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={createFolder}
                style={{
                  padding: "8px 16px",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {previewFile && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={previewFile.originalName}
          onClick={() => setPreviewFile(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 5000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(15, 23, 42, 0.86)",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "min(100%, 960px)",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setPreviewFile(null)}
              style={{
                alignSelf: "flex-end",
                border: "none",
                background: "white",
                color: "#0f172a",
                borderRadius: "999px",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                fontSize: "22px",
                lineHeight: 1,
              }}
            >
              <X size={18} />
            </button>
            {isVideo(previewFile.mimeType) ? (
              <video
                src={previewFile.url}
                controls
                autoPlay
                style={{ maxWidth: "100%", maxHeight: "78vh", borderRadius: "10px" }}
              />
            ) : (
              <img
                src={previewFile.url}
                alt={previewFile.originalName}
                style={{ maxWidth: "100%", maxHeight: "78vh", objectFit: "contain", borderRadius: "10px" }}
              />
            )}
            <div style={{ color: "white", fontSize: "13px", textAlign: "center" }}>
              {previewFile.originalName}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Sub-components ----------
function StatCard({ label, value, icon, color, onClick, active }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick()
          : undefined
      }
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: active
          ? `0 0 0 2px ${color}33`
          : "0 1px 3px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        border: active ? `1px solid ${color}` : "1px solid #e5e7eb",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div
        style={{
          background: `${color}20`,
          padding: "8px",
          borderRadius: "8px",
          color: color,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "20px", fontWeight: "700" }}>{value}</div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>{label}</div>
      </div>
    </div>
  );
}

function FileCard({
  item,
  isImage,
  formatSize,
  onDelete,
  onRestore,
  onToggleFavourite,
  onRename,
  onDownload,
  onCopyLink,
  onOpen,
  showRecycleBin,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(item.originalName);

  const handleRename = () => {
    if (newName.trim() && newName !== item.originalName) {
      onRename(item._id, newName);
    } else {
      setEditing(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        overflow: "hidden",
        background: "white",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s",
        position: "relative",
      }}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* Preview */}
      <div
        onClick={() => onOpen(item)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen(item);
          }
        }}
        style={{
          height: "140px",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e5e7eb",
          cursor: "pointer",
        }}
      >
        {isImage(item.mimeType) ? (
          <img
            src={item.url}
            alt={item.originalName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : item.mimeType === "application/pdf" ? (
          <FileText size={48} color="#ef4444" />
        ) : item.mimeType.includes("spreadsheet") ? (
          <FileSpreadsheet size={48} color="#10b981" />
        ) : item.mimeType.includes("zip") ? (
          <FileArchive size={48} color="#f59e0b" />
        ) : (
          <FileText size={48} color="#6b7280" />
        )}
        {item.isFavourite && (
          <Star
            size={16}
            color="#f59e0b"
            style={{ position: "absolute", top: "8px", right: "8px" }}
          />
        )}
      </div>

      {/* Details */}
      <div style={{ padding: "10px 12px" }}>
        {editing ? (
          <div style={{ display: "flex", gap: "6px" }}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                flex: 1,
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "12px",
              }}
              autoFocus
            />
            <button
              onClick={handleRename}
              style={{
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "500",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={item.originalName}
            >
              {item.originalName}
            </div>
            <div
              style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}
            >
              {formatSize(item.size)} •{" "}
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </>
        )}
      </div>

      {/* Action Buttons (visible on hover) */}
      {showMenu && !editing && (
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            display: "flex",
            gap: "4px",
            background: "rgba(255,255,255,0.9)",
            padding: "4px 6px",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {!showRecycleBin ? (
            <>
              <button
                onClick={() => onDownload(item.url)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                }}
              >
                <Download size={14} />
              </button>
              <button
                onClick={() => {
                  setEditing(true);
                  setNewName(item.originalName);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                }}
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => onToggleFavourite(item._id, item.isFavourite)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  color: item.isFavourite ? "#f59e0b" : "#6b7280",
                }}
              >
                {item.isFavourite ? <Star size={14} /> : <StarOff size={14} />}
              </button>
              <button
                onClick={() => onCopyLink(item.url)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                }}
              >
                <Copy size={14} />
              </button>
              <button
                onClick={() => onDelete(item._id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  color: "#ef4444",
                }}
              >
                <Trash2 size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onRestore(item._id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  color: "#3b82f6",
                }}
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => onDelete(item._id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  color: "#ef4444",
                }}
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function FileRow({
  item,
  isImage,
  formatSize,
  onDelete,
  onRestore,
  onToggleFavourite,
  onRename,
  onDownload,
  onCopyLink,
  onOpen,
  showRecycleBin,
}) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(item.originalName);

  const handleRename = () => {
    if (newName.trim() && newName !== item.originalName) {
      onRename(item._id, newName);
    } else {
      setEditing(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        borderBottom: "1px solid #f3f4f6",
        gap: "12px",
      }}
    >
      <div style={{ width: "30px", display: "flex", justifyContent: "center" }}>
        {isImage(item.mimeType) ? (
          <FileImage size={20} color="#10b981" />
        ) : (
          <FileText size={20} color="#6b7280" />
        )}
      </div>
      <div style={{ flex: 1 }}>
        {editing ? (
          <div style={{ display: "flex", gap: "6px" }}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                padding: "2px 6px",
              }}
              autoFocus
            />
            <button
              onClick={handleRename}
              style={{
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "2px 10px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpen(item)}
            style={{
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "14px",
              color: "#1d4ed8",
              textAlign: "left",
            }}
          >
            {item.originalName}
          </button>
        )}
      </div>
      <div style={{ fontSize: "12px", color: "#6b7280", width: "100px" }}>
        {formatSize(item.size)}
      </div>
      <div style={{ fontSize: "12px", color: "#6b7280", width: "120px" }}>
        {new Date(item.createdAt).toLocaleDateString()}
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {!showRecycleBin ? (
          <>
            <button onClick={() => onDownload(item.url)}>
              <Download size={16} />
            </button>
            <button
              onClick={() => {
                setEditing(true);
                setNewName(item.originalName);
              }}
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onToggleFavourite(item._id, item.isFavourite)}
            >
              {item.isFavourite ? (
                <Star size={16} color="#f59e0b" />
              ) : (
                <StarOff size={16} />
              )}
            </button>
            <button onClick={() => onCopyLink(item.url)}>
              <Copy size={16} />
            </button>
            <button
              onClick={() => onDelete(item._id)}
              style={{ color: "#ef4444" }}
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onRestore(item._id)}>
              <RefreshCw size={16} color="#3b82f6" />
            </button>
            <button
              onClick={() => onDelete(item._id)}
              style={{ color: "#ef4444" }}
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
