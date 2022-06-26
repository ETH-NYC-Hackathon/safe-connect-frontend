import { ethers } from "ethers";

export const getRegistryContractForOpKovan = () => {
  const provider = new ethers.providers.JsonRpcProvider("https://kovan.optimism.io", 69);
  return new ethers.Contract(
    "0xdf08F459e2C6e1886B2976BB175D2264E7D734C3",
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
  const contract = getRegistryContractForOpKovan();
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
