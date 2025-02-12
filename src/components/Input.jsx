function Input({register, errors, id, labelText, type, rules}) {
    return (
    <div className="mb-3">
        <label htmlFor={id} className="form-label">{labelText}</label>
        <input
            type={type}
            className={`form-control ${errors[id] && 'is-invalid'}`}
            id={id}
            placeholder={`請輸入${labelText}`}
            {...register(id, rules)}
        />
        {
            errors[id] && (<div className="invalid-feedback">{errors?.[id]?.message}</div>)
        }
    </div>)
}

export default Input