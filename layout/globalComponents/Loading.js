import Lottie from 'react-lottie';
import * as animationData from '../lottie/loading.json'

export default ({LoadingState}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className={`z-50 fixed top-0 w-screen h-screen flex justify-center items-center bg-bgblacktp ${LoadingState ? 'block' : 'hidden'}`}>
            <Lottie options={defaultOptions}
                height={150}
                width={150}
            />
        </div>
    )
}