import EditableField from "./EditableFields";

function PasswordList({passwordInfos}) {

  return (
    <div>
      {passwordInfos && passwordInfos.map((info, index) => (
        <div key={index}>
          <EditableField initialValue={info.url} />
          <EditableField initialValue={info.password} />
          <button>❌</button>
        </div>
      ))}
    </div>
  );
}

export default PasswordList;
