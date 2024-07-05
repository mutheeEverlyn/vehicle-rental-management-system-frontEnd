import car1 from '../assets/car1.png'

const Container = () => {
  return (
    <div className='flex gap-10 justify-evenly'>
      <img src={car1} alt="blue car" className='hue-rotate-180'/>
      <div className='mt-20'>
        <h1 className='text-3xl font-extrabold'>Best car rental deals</h1>
        <p>call us for your next ride</p>
        <p>☎ 01000000765</p>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Container
