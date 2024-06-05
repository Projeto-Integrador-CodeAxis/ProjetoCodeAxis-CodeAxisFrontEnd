import { useState, useContext, useEffect } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar } from "../../../services/Service"
import Curso from "../../../models/Curso"
import CardCurso from "../cardcursos/CardCurso"

function ListarCurso() {

    const navigate = useNavigate()

    const [curso, setCurso] = useState<Curso[]>([]);

    const {usuario, handleLogout} = useContext(AuthContext)
    const token = usuario.token

    async function buscarCurso() {
        try{
            await buscar(`/cursos`, setCurso,{
                headers: {Authorization: token}
            })
        } catch (error: any){
            if(error.toString().includes('401')){
                alert('O token expirou!')
                handleLogout()
            }
        }
        
    }

    useEffect(() => {
        if (token === ''){
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarCurso();
    }, [curso.length]);

    return (
        <>
        

        <div className="flex justify-center w-full my-4"> 
        {curso.length === 0 && (
            <ThreeDots 
            visible={true}
            height="80"
            width="80"
            ariaLabel="three-dots-loading"
            wrapperClass="three-dots-wrapper mx-auto"
            color="#1e9bebff"
        />
        )}

</div>
        
            <div className="flex justify-center w-full my-4 h-full">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
                        <>
                            {curso.map((curso) => (
                                <>
                                    <CardCurso key={curso.id} curso={curso} />
                                </>
                            ))}
                        </>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default ListarCurso;