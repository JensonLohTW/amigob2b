# Vending Machine 3D Model

請將互動 3D 所需的檔案（.glb / .gltf / .bin / texture）放入此資料夾。

建議結構：
```
public/models/vending-machine/
  ├── 狗狗販賣機_0724.glb  # 或您的模型檔名
  ├── 狗狗販賣機_0724.bin  # 若 glTF 需外部 binary
  └── texture/             # 相關貼圖
```

新增或更名後，請同步修改 `src/components/InteractiveVendingMachine.tsx` 中的路徑。 