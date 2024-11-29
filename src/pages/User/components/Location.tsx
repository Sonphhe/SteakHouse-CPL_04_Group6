import { useState } from 'react';
import '../User.css';
import { GoHomeFill } from "react-icons/go";

const Location = () => {
  const [locations, setLocations] = useState([
    { id: 1, name: 'Son Pham', phone: '0357663145', address: 'Ha Noi', isDefault: true },
    { id: 2, name: 'Pham Son', phone: '0357663145', address: 'Dai Hoc FPT', isDefault: false },
  ]);

  const handleDelete = (id: number) => {
    setLocations(locations.filter((location) => location.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setLocations(
      locations.map((location) =>
        location.id === id
          ? { ...location, isDefault: true }
          : { ...location, isDefault: false }
      )
    );
  };

  return (
    <div className="location-container">
      <div className="location-container-header">
        <h2>Delivery Addresses</h2>
        <button className="add-location-btn">Add New Address</button>
      </div>
      <div className="location-list">
        {locations.map((location) => (
          <div className="location-item" key={location.id}>
            <div className="location-info">
              <span
                className={`location-icon ${location.isDefault ? 'default' : ''}`}
                onClick={() => handleSetDefault(location.id)}
              >
                <GoHomeFill />
              </span>
              <div className="location-details">
                <p className="location-name">
                  <span className="name-bold">{location.name}</span> | {location.phone}
                  {location.isDefault && <span className="default-badge">Default</span>}
                </p>
                <p className="location-address">{location.address}</p>
              </div>
            </div>
            <div className="location-actions">
              <button className="edit-btn">Edit</button>
              {!location.isDefault && (
                <button className="delete-btn" onClick={() => handleDelete(location.id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
