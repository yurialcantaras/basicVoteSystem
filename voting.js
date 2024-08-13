if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('MetaMask is required to use this DApp. Please install it.');
}

// Endereço do contrato na blockchain da Polygon
const contractAddress = '0x8604b9a3d91eD29894dE5034AD6F506834c07e0C';  // Substitua com o endereço do contrato

// ABI do contrato (Application Binary Interface)
const contractABI = [
    "event VoteCast(address indexed voter, string vote)",
    "function vote(string _vote) external"
];

// Função para enviar o voto
async function sendVote(userVote) {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Solicita ao usuário que conecte a MetaMask
            await ethereum.request({ method: 'eth_requestAccounts' });
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Envia a string para o contrato
            const tx = await contract.vote(userVote);

            // Aguardar a confirmação da transação
            await tx.wait();

            alert('Voto registrado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar o voto:', error);
            alert('Houve um erro ao enviar o voto. Por favor, tente novamente.');
        }
    } else {
        alert('MetaMask is required to use this DApp. Please install it.');
    }
}

// Função para validação e envio do voto
function submitVote() {
    const voteValue = document.querySelector('input[name="vote"]:checked').value;

    // Envia o valor selecionado como string para o contrato
    sendVote(voteValue);
}
