export default function SharedPasswordList({ sharedPasswordInfos }) {
  return (
    <div className="password-list">
      <div className="title-container">
        <h4 className="url-title">URL</h4>
        <h4 className="password-title">Password</h4>
        <h4 className="password-title">Password Owner</h4>
      </div>
      {sharedPasswordInfos &&
        sharedPasswordInfos.map((info) => (
          <div key={info._id}>
            <p>{info.senderName}</p>
            <p>{info.url}</p>
            <p>{info.password}</p>
          </div>
        ))}
    </div>
  );
}
