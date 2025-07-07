const AnimateBlob =()=>{
    return  <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 right-0 -translate-y-1/2 w-80 h-80 bg-gray-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob -translate-x-1/2 animation-delay-2000"></div>
      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000 -translate-y-1/2"></div>
    </div>
}
export default AnimateBlob;