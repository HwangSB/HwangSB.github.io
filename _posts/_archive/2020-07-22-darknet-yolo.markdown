---
layout: post
title:  "Darknet - YOLOv4"
date:   2020-07-22 17:00:00 +0900
categories: jekyll update
---

# 설치
1. CMake 3.18.0  
2. OpenCV 4.4.0  
3. CUDA 11.0  
4. cuDNN 8.0

# 빌드 전 프로젝트 설정
darknet-master/build/darknet/darknet.sln 실행 > Configuration: Release/x64로 변경  
추가 포함 디렉터리 opencv include  
추가 라이브러리 디렉터리 opencv lib  
darknet-master/build/darknet/darknet.vcxproj 메모장으로 열어 "CUDA 10.0"을 "CUDA 11.0"으로 수정  
환경변수 > 시스템변수 > CUDNN: C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.0 추가  
CUDA C/C++ > Device > Code Generation: https://developer.nvidia.com/cuda-gpus#collapse4 (ex GTX 1080TI = compute_61,sm_61)

# YOLOv4
https://github.com/AlexeyAB/darknet

# YOLO mark (라벨링)
https://github.com/AlexeyAB/Yolo_mark

# cfg 파일 생성
darknet-master/cfg/yolov4-custom.cfg 복사 > darknet-master/build/darknet/x64/yolo-obj.cfg로 붙여넣기

## cfg 파일 커스터마이징
[yolo] classes=라벨링한 오브젝트 개수  
[yolo] 바로 위에 있는 [convolutional]에 filter=(classes + 5) * 3  
모든 [yolo] 레이아웃에 대해 동작 수행

# 학습
darknet.exe detector train [data file] [cfg file] [pre-trained weights]

# 예측
darknet.exe detector test [data file] [cfg file] [weights file] [image file]  
darknet.exe detector demo [data file] [cfg file] [weights file] [video file]  
darknet.exe detector demo [data file] [cfg file] [weights file] [webcam]

## 예측 결과 저장
-out_filename [filename]

## 임계값 설정
-thresh [0.0-1.0]

# 데이터 증식
위치, 크기, 왜곡, 회전, 반전, 색상, 확대

## keras
```python
# Author: HwangSB
import os
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import array_to_img, img_to_array, load_img

data_generator = ImageDataGenerator(
    rotation_range=45,
    width_shift_range=0.2,
    height_shift_range=0.2,
    rescale=1.0 / 255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

files = [f for f in os.listdir('data') if os.path.isfile(os.path.join('data', f))]

index = 0

for file_name in files:
    print(file_name)
    img = load_img('data/' + file_name, target_size=(1440, 1920))
    x = img_to_array(img)
    x = x.reshape((1,) + x.shape)

    i = 0
    for batch in data_generator.flow(x, batch_size=1, save_to_dir='preview', save_prefix='output_' + str(index), save_format='jpg'):
        i += 1
        if i >= 20:
            break

    index += 1
```

## albumentations
```python
# Author: ENTAR0
from PIL import Image
import shutil
import os
import cv2
import numpy as np
import time
import torch
import torchvision
from torch.utils.data import Dataset
from torchvision import transforms
import albumentations
from albumentations.pytorch import ToTensorV2
from matplotlib import pyplot as plt

class AlbumentationsDataset(Dataset):
    def __init__(self, file_paths, labels, transform=None):
        self.file_paths = file_paths
        self.labels = labels
        self.transform = transform(image=image, bboxes=bboxes)
        self.transformed_image = transformed[image]
        self.transformed_bboxes = transformed[bboxes]
        
    def __len__(self):
        return len(self.file_paths)

    def __getitem__(self, idx):
        label = self.labels[idx]
        file_path = self.file_paths[idx]
        
        # Read an image with OpenCV
        image = cv2.imread(file_path)
        
        # By default OpenCV uses BGR color space for color images,
        # so we need to convert the image to RGB color space.
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        start_t = time.time()
        if self.transform:
            augmented = self.transform(image=image) 
            image = augmented['image']
            total_time = (time.time() - start_t)
        return image, label, total_time
    
albumentations_transform = albumentations.Compose([
        albumentations.ToGray(p=0.35),
        albumentations.HorizontalFlip(p=0.5),
        albumentations.VerticalFlip(p=0.5),
        albumentations.OneOf([
            albumentations.HueSaturationValue(p=0.7),
            albumentations.ChannelShuffle(p=0.7),
            albumentations.RGBShift(r_shift_limit =20, g_shift_limit=20,b_shift_limit=20, p=0.4),
        ], p=0.8),
        albumentations.OneOf([
            albumentations.RandomResizedCrop(224, 224, scale=(0.25, 0.9), ratio=(0.8, 1.2), interpolation=0, p=0.7),
            albumentations.RandomResizedCrop(512, 512, scale=(0.25, 0.9), ratio=(0.8, 1.2), interpolation=0, p=0.7),
            albumentations.RandomResizedCrop(1024, 1024, scale=(0.25, 0.9), ratio=(0.8, 1.2), interpolation=0, p=0.7),
            albumentations.ShiftScaleRotate(p=0.4),
        ], p=1),
        albumentations.OneOf([
            albumentations.RandomBrightness(limit=0.4, p=0.7),
            albumentations.RandomBrightnessContrast(brightness_limit=0.4, contrast_limit=0.4, p=0.7),
        ], p=0.8),
        albumentations.pytorch.transforms.ToTensor()
    ], bbox_params=albumentations.BboxParams(format='yolo', min_area=0, min_visibility=0))    
    
    
image_list = []
bbox_list = []
yolo_bboxes= []
norm_bboxes= []

address = "C:\\Users\dongwoo\Desktop\data\img"
s_address= "C:\\Users\dongwoo\Desktop\\train set\img\\"
data_list=os.listdir(address)
search = ".jpg"

cnt = 1726

for i in data_list:
    if search in i:
        image_list.append(i)
    else:
        bbox_list.append(i)
        
for i in range(120, len(image_list)):
    i_name = image_list[i]
    i_path = address +"\\"+ i_name
    t_name = bbox_list[i]
    t_path = address +"\\"+ t_name
    
    # 이미지 정보 불러오기
    image = cv2.imread(i_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    height, width, channel = image.shape
    
    # label, bbox format 불러오기
    with open(t_path,'r') as f:
        line=f.readline()
        for s in line.split(" "):
            yolo_bboxes.append(float(s))
    temp=yolo_bboxes.pop(0)
    temp=int(temp)
    yolo_bboxes.insert(4,str(temp))

    # 한 그림에 대한 반복횟수
    iterations = 20
    for i in range(0, iterations):
        transformed=albumentations_transform(image=image, bboxes=[yolo_bboxes])
        transformed_image = transformed['image']
        transformed_bboxes = transformed['bboxes']
        im=transformed_image.numpy() # tensor -> numpy
        im=np.transpose(im,(1,2,0)) # shape 변형
        
        # plt 여백 및 축 제거
        plt.figure(figsize=(10, 10))
        plt.axis('off')
        plt.xticks([]), plt.yticks([])
        plt.tight_layout()
        plt.subplots_adjust(left = 0, bottom = 0, right = 1, top= 1, hspace= 0, wspace=0)
        plt.imshow(im)
        
        # 이미지 및 텍스트 파일 저장
        f_name1 = "train_data_" + str(cnt) + ".txt"
        f_name2 = "train_data_" + str(cnt) + ".jpg"
        cnt+=1
        save_path_img = s_address + f_name2
        save_path_txt = s_address + f_name1
        plt.savefig(save_path_img, bbox_inces='tight',pad_inches=0)
        bboxes_txt=list(transformed_bboxes[0])
        temp=bboxes_txt.pop(4)
        bboxes_txt.insert(0,int(temp))
        with open(save_path_txt,'w') as f1:
            for s in bboxes_txt:
                f1.write(str(s)+ " ")
        plt.close()


    yolo_bboxes = [] # 박스 초기화

s_address= "C:\\Users\dongwoo\Desktop\\train set\\"
name = "train.txt"
path = s_address + name
f = open(path,'w')
for i in range(0, 4525):
    data = "data/obj/train_data_" + str(i) +".jpg\n"
    f.write(data)
```

# Video Stopped 에러 발생시
opencv_videoioffmpeg440_64.dll을 darknet.exe와 같은 폴더 안에 넣기

# 참고
https://medium.com/@jonathan_hui/yolov4-c9901eaa8e61  
https://pgmrlsh.tistory.com/6
