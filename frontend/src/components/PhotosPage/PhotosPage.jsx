import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, removePhoto } from "../../store/photos";
import PhotosDetailsModal from "./PhotosDetailsModal";
import { FaCamera, FaTimesCircle } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import PhotoFormModal from "./PhotoFormModal";
import "./PhotosPage.css";

const PhotosPage = () => {
	const dispatch = useDispatch();
	const { setModalContent } = useModal();
	const photos = useSelector((state) => state.photos.all);
	const sessionUser = useSelector((state) => state.session.user);

	const [selectedPhoto, setSelectedPhoto] = useState(null);
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		dispatch(fetchPhotos());
	}, [dispatch]);

	const handlePhotoClick = (photo) => {
		setSelectedPhoto({
			...photo,
			url: photo.image_url,
		});
	};

	const handleDelete = (photoId) => {
		dispatch(removePhoto(photoId));
	};

	const handlePhotoCreated = () => {
		dispatch(fetchPhotos());
		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 2000);
	};

	const userPhotos = photos.filter(
		(photo) => photo.user_id === sessionUser?.id,
	);

	return (
		<div className="photos-page">
			<div className="photos-header">
				<h1>My Photos</h1>
				<div className="create-photo-container">
					<button
						className="create-photo-button"
						onClick={() =>
							setModalContent(<PhotoFormModal onSuccess={handlePhotoCreated} />)
						}
					>
						<FaCamera className="camera-icon" />
						Create New Photo
					</button>
				</div>
			</div>

			{showSuccess && (
				<div className="success-message">Photo created successfully!</div>
			)}

			<div className="photo-grid">
				{userPhotos.map((photo) => (
					<div
						key={photo.id}
						className="photo-card"
						onClick={() => handlePhotoClick(photo)}
					>
						<div className="photo-card__img-container">
							<img src={photo.image_url} alt={photo.title} />
						</div>
						<div className="photo-details">
							<h3>{photo.title}</h3>
						</div>
						<button
							className="photo-remove-btn"
							onClick={(e) => {
								e.stopPropagation();
								handleDelete(photo.id);
							}}
						>
							<FaTimesCircle />
						</button>
					</div>
				))}
			</div>

			{selectedPhoto && (
				<PhotosDetailsModal
					photo={selectedPhoto}
					onClose={() => setSelectedPhoto(null)}
				/>
			)}
		</div>
	);
};

export default PhotosPage;
