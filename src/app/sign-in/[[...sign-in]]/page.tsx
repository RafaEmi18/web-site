import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return(
    <div className='h-[calc(100hv-96px)] flex items-center justify-center'> 
    <SignIn />
    </div>
    );
}