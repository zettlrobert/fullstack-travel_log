import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import { createLogEntry } from './API';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false); // only need to set loading to false because otherwise the modal closes
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />

      <label htmlFor="description">Description</label>
      <textarea name="description" rows={2} ref={register}></textarea>

      <label htmlFor="personalComment">Personal Comment</label>
      <textarea name="personalComment" rows={2} ref={register}></textarea>

      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />

      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />

      <button disabled={loading} className="formButton">{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>

  )
}

export default LogEntryForm;