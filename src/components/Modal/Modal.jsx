import './Modal.scss';

function Modal({ onClose }) {
  return (
    <section className="modal-popup">
      <div className="backdrop" onClick={onClose} />
      <div className="modal-content">{/* {data} */}modal-content</div>
    </section>
  );
}

export default Modal;
