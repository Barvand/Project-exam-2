function RenderProfile({ profile }) {
  return (
    <div className="container relative">
      <div
        className="h-64 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${profile.banner.url})` }}
        aria-label={profile.banner.alt}
      />
      <div className="absolute top-1/2 left-0 transform grid grid-cols-3 bg-slate-400 p-4 rounded">
        <img
          className="h-64 rounded-full object-cover border-4 border-white"
          src={profile.avatar.url}
          alt={profile.avatar.alt}
        />
        <div className="p-5">
          <h1 className="text-5xl">{profile.name}</h1>
          <p className="text-1xl">{profile.bio}</p>
          <p className="text-1xl">
            {profile.VenueManager ? <p>Venue Manager</p> : <p> Not a manager </p> }
          </p>
        </div>
      </div>
    </div>
  );
}

export default RenderProfile;
