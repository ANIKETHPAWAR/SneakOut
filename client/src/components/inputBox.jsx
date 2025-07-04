function InputBox({ label, placeholder, onChange }) {
    return (
        <div className="text-sm font-medium text-left py-2 ">
            <div>
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} autoComplete="off" className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>
    );
}
export default InputBox;