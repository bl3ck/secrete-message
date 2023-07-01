export default function Footer(){
    const date = new Date()
    const year = date.getFullYear()
    return(
        <>
            <footer>
                <p> © {year} Secrete Messages </p>
            </footer>
        </>
    )
}