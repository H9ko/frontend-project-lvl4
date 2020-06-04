import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { actions, asyncActions } from '../../slices';
import { modalProps } from '../../selectors';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(modalProps);
  const handleHide = () => {
    dispatch(actions.hideModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncActions.removeChannel({ channelId: id })).then(() => handleHide());
  };


  return (
    <Modal show onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Button type="submit" className="btn btn-primary">Confirm remove channel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
