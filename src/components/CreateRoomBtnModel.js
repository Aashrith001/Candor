/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useRef, useState } from 'react'
import { Button, Icon, Modal, Form, FormControl, ControlLabel, FormGroup, Schema, Alert } from 'rsuite'
import firebase from 'firebase/app';
import { useModelState } from '../misc/custom-hooks'
import { auth, database } from '../misc/firebase';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Chat name is required'),
  description: StringType().isRequired('Description is required'),
})

const initialState = {
  name: '',
  description: ''
}

const CreateRoomBtnModel = () => {

  const { isOpen, open, close } = useModelState();

  const [formValue, setFormValue] = useState(initialState);
  const [isloading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) return;
    setIsLoading(true);

    const newRoomdata = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true
      }
    }

    try {
      await database.ref('rooms').push(newRoomdata);

      Alert.info(`${formValue.name} has been created`)

      setIsLoading(false);
      setFormValue(initialState);
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }

  }

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" /> Create new chat room
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}>
            <FormGroup>
              <ControlLabel>Room name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room description..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="primary" onClick={onSubmit} disabled={isloading}>
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateRoomBtnModel
