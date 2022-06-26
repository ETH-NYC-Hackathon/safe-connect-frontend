import { ethers } from "ethers";
// import { SUPPORTED_CHAINS } from "../../chains";

export const getSafeConnectRegistryContract = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rinkeby.infura.io/v3/dd9e0e8a902143c4be774ccf9ded3ba3",
  );
  return new ethers.Contract(
    "0x8697cA459d2B7e462f0c754c6D9387d248b66205",
    [
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "uriId",
            type: "bytes32",
          },
        ],
        name: "getUri",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "protocol",
                type: "string",
              },
              {
                internalType: "string",
                name: "host",
                type: "string",
              },
              {
                internalType: "string",
                name: "origin",
                type: "string",
              },
              {
                internalType: "address",
                name: "maker",
                type: "address",
              },
              {
                internalType: "bytes4",
                name: "dataType",
                type: "bytes4",
              },
              {
                internalType: "bytes4",
                name: "status",
                type: "bytes4",
              },
            ],
            internalType: "struct UriLib.UriData",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    provider,
  );
};

export const getSafeConnectRegistryData = async (
  protocol: string,
  host: string,
  origin: string,
) => {
  const contract = getSafeConnectRegistryContract();
  const abiCoder = new ethers.utils.AbiCoder();
  const result = await contract.functions.getUri(
    ethers.utils.keccak256(
      abiCoder.encode(
        ["bytes32", "bytes32", "bytes32"],
        [
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(protocol)),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(host)),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(origin)),
        ],
      ),
    ),
  );
  return result[0];
};
