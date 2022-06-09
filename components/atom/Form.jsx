import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

const Form = ({ formId, projectForm, forNewProject = true }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: projectForm.name,
    symbol: projectForm.symbol,
    chain: projectForm.chain,
    status: 'submitted',
    description: projectForm.description,
    avatar: projectForm.avatar,
    price: projectForm.price,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/projects/${id}`, data, false); // Update the local data without a revalidation
      router.push('/');
    } catch (error) {
      setMessage('Failed to update project');
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/');
    } catch (error) {
      setMessage('Failed to add project');
    }
  };

  const handleChange = (e) => {
    const { target } = e;
    const value = target.name === 'poddy_trained' ? target.checked : target.value;
    const { name } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure project info is filled for project name, owner name, species, and image url */
  const formValidate = () => {
    const err = {};
    if (!form.name) err.name = 'Name is required';
    if (!form.symbol) err.symbol = 'Symbol is required';
    if (!form.chain) err.chain = 'chain is required';
    if (!form.description) err.description = 'description is required';
    if (!form.avatar) err.avatar = 'avatar is required';
    if (!form.price) err.price = 'price is required';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      // eslint-disable-next-line no-unused-expressions
      forNewProject ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="symbol">Symbol</label>
        <input
          type="text"
          maxLength="20"
          name="symbol"
          value={form.symbol}
          onChange={handleChange}
          required
        />
        <label htmlFor="chain">Chain</label>
        <input
          type="text"
          maxLength="30"
          name="chain"
          value={form.chain}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          maxLength="60"
          value={form.description}
          onChange={handleChange}
        />
        <label htmlFor="avatar">Avatar URL</label>
        <input
          type="url"
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          required
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
