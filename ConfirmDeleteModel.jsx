const [deleteItem, setDeleteItem] = useState(null);

const handleDelete = async (item) => {
  console.log("Deleting:", item);

  // Your API delete request here

  setDeleteItem(null);
};

return (
  <>
    <button onClick={() => setDeleteItem(file)}>
      Delete
    </button>

    <ConfirmDeleteModal
      item={deleteItem}
      onConfirm={handleDelete}
      onCancel={() => setDeleteItem(null)}
    />
  </>
);
