
import Detail from './Detail'

export default async function DetailContainer(props) {
    const id  = props.params.id
    console.log(props.params.id,'prpos--')
    const res = await fetch(`https://api.imgflip.com/get_memes`)
    const data = await res.json()
    const response = data.data.memes.filter((e) => e.id === id)

    console.log(response, '<----data')


    return <Detail response={response} />
}

