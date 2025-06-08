import FertilizerCard from "./FertilizerCard";

const AdminFertilizerGrid = ({ fertilizers, handleUpdate, handleDelete }) => {
  return (
    <div className="px-10 py-4 grid gap-x-7 gap-y-6 grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]">
      {fertilizers.map((fertilizer, index) => (
        <FertilizerCard
          key={index}
          {...fertilizer}
          isAdmin={true}
          onUpdate={() => handleUpdate(fertilizer.id)}
          onDelete={() => handleDelete(fertilizer.id)}
        />
      ))}
    </div>
  );
};

export default AdminFertilizerGrid;
