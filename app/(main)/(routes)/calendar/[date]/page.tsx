const DatePage = ({
    params,
}:{
    params: { date:string }
}) => {
    const [year, month, day] = params.date.split('-')

    return (
        <div>
            <h2>{year}-{month}-{day}</h2>
        </div>
    );
}
 
export default DatePage;