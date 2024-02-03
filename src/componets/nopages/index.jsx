export const NoPages = () => {
    return (
        <>
        <h1>Página não encontardo!</h1>
        </>
    )


    return (
        <>
          <Stack>
            <h2>por que os clientes nos amam?</h2>
    
            {dadosDosClientes.map((item, index) => {
              return (
                <Stack>
                  <Stack key={index}>
                    <div className="stares">
                      <StarRateIcon className="myStares" />
                      <StarRateIcon className="myStares" />
                      <StarRateIcon className="myStares" />
                      <StarRateIcon className="myStares" />
                      <StarRateIcon className="myStares" />
                    </div>
                    <p>{item.message}</p>
                    <Box className="review-profileImg">
                      <img src={item.customerImage} alt="Opa!!" />
                      <h3>{item.nome}</h3>
                    </Box>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </>
      );
}