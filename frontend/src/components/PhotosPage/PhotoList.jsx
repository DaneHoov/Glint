import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPhotos } from "../../store/photos";
import PhotoCard from "./PhotoCard";

export default function PhotoList() {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.all);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
