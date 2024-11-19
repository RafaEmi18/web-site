"use client"

import { updateProfile } from "@/lib/actions"
import { User } from "@prisma/client"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useActionState, useState } from "react"
import UpdateButton from "./UpdateButton"

const UpdateUser = ({user}: {user: User}) => {

  const [open, setOpen] = useState(false)
  const [cover, setCover] = useState<any>(false)

  const [state, formAction] = useActionState(updateProfile, {success: false, error: false})

  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
    state.success && router.refresh()
  }

  return(
    <div className="">
      <span className="text-blue-500 text-xs cursor-pointer" onClick={() => setOpen(true)}>Actualizar</span>
      { open && (<div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
        <form action={(formData) => formAction({formData, cover: cover?.secure_url || ""})} className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative overflow-y-auto max-h-[90vh]">
        <h1>Actualizar Perfil</h1>
        <div className="mt-4 text-xs text-gray-500">
          Usa la barra de iconos para cambiar la foto de perfil y nombre de usuario.
        </div>
        {/* CLOUDINARY */}
        <CldUploadWidget uploadPreset="social" onSuccess={(result) => setCover(result.info)}>
          {({open }) => { return (<div className="flex flex-col gap-4 my-4" onClick={()=>open()}>
          <label htmlFor="">Foto de Portada</label>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src={user.cover || "/noCover.png"} alt="" width={48} height={32} className="w-12 h-8 rounded-md object-cover"/>
            <span className="text-xs underline text-gray-600">Cambiar</span>
          </div>
        </div>)}}
        </CldUploadWidget>
        {/* ENTRADA NOMBRE */}
        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500" >Nombre</label>
            <input type="text" placeholder={user.name || "John"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="name"/>
          </div>
        </div>
        {/* ENTRADA APELLIDO */}
        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500" >Apellido</label>
            <input type="text" placeholder={user.surname || "Doe"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="surname"/>
          </div>
        </div>
        {/* DESCRIPCION */}
        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500" >Descripción</label>
            <input type="text" placeholder={user.description || "La vida es bella"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="description"/>
          </div>
        </div>
        {/* CIUDAD */}
        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500" >Ciudad</label>
            <input type="text" placeholder={user.city || "Tapayork"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="city"/>
          </div>
        </div>
        {/* ESCUELA */}
        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500" >Escuela</label>
            <input type="text" placeholder={user.school || "Politecnica de Tapachula"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="school"/>
          </div>
        </div>
        {/* TRABAJO */}
        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500" >Trabajo</label>
            <input type="text" placeholder={user.work || "Domino´s"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="work"/>
          </div>
        </div>
        {/* WEBSITE */}
        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xs text-gray-500" >Pagina Web</label>
            <input type="text" placeholder={user.website || "facebook.com"} className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm" name="website" />
          </div>
        </div>
        <UpdateButton/>
        {state.success && <span className="text-green-500">Perfil Actualizado con Exito!</span>}
        {state.error && <span className="text-red-500">An Error Has Been Ocurred!</span>}
        <div className="absolute text-xl right-2 top-3 cursor-pointer" onClick={handleClose}>X</div> 
        </form>
      </div>)}
    </div>
  )
}

export default UpdateUser
