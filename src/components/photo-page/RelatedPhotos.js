import React, { useState, useEffect } from 'react';
import usePhotos from '../../hooks/usePhotos';
import HomePhotoList from '../others/photo-list/HomePhotoList';
import config from '../../config';

const RelatedPhotos = ({
  authorizedUser, photoToShow,
}) => {
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);

  const tags1 = photoToShow && photoToShow.tags;

  const tags = tags1 && tags1.split(',');

  const variables = {
    searchKeyword: tags && tags[0],
    checkUserLike: !authorizedUser ? config.visitorID : authorizedUser.id,
    first: 10,
  };

  const { photos, fetchMore } = usePhotos(variables);

  useEffect(() => {
    if (photos) {
      const temp = photos && photos.edges
        ? photos.edges.map((edge) => edge.node)
        : [];

      setAllPhotos(temp);
      setLoading(false);
    }
  }, [photos, authorizedUser]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  return (
    <div>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Similar photos</h1>
        </div>
      </div>
      <HomePhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
        loading={loading}
      />
    </div>
  );
};

export default RelatedPhotos;
