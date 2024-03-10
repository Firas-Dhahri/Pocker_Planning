package com.example.pockerplanning.services.impl;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.*;
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Scalar;
import org.opencv.imgproc.Imgproc;

import javax.imageio.ImageIO;
@Service
public class ImageTextExtractionService {

    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }

    private final ITesseract tesseract;

    public ImageTextExtractionService() {
        this.tesseract = new Tesseract();
        // Set Tesseract data path if needed
        this.tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata");
        this.tesseract.setOcrEngineMode(3); // 3 correspond à OEM_TESSERACT_ONLY
        this.tesseract.setPageSegMode(1); // 1 correspond à PSM_AUTO
        this.tesseract.setTessVariable("user_defined_dpi", "187");
    }

    public String extractTextFromImage(MultipartFile imageFile) throws IOException, TesseractException {
        // Convert MultipartFile to byte array
        byte[] imageBytes = imageFile.getBytes();

        // Perform OCR on the image bytes
        String extractedText = performOCR(imageBytes);

        return extractedText;
    }

    private String performOCR(byte[] imageBytes) throws TesseractException, IOException {
        // Convert byte array to BufferedImage
        ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
        BufferedImage bufferedImage = ImageIO.read(inputStream);

        // Perform OCR on the BufferedImage
        String extractedText = tesseract.doOCR(bufferedImage);

        return extractedText;
    }

    public String extractBlueTextFromImage(MultipartFile imageFile) throws IOException, TesseractException {
        // Convert MultipartFile to byte array
        byte[] imageBytes = imageFile.getBytes();

        // Convert the image to Mat
        Mat image = Imgcodecs.imdecode(new MatOfByte(imageBytes), Imgcodecs.IMREAD_COLOR);

        // Convert the image to HSV color space
        Mat hsvImage = new Mat();
        Imgproc.cvtColor(image, hsvImage, Imgproc.COLOR_BGR2HSV);

        // Define the range of blue color in HSV
        Scalar lowerBlue = new Scalar(135, 50, 50);
        Scalar upperBlue = new Scalar(175, 255, 255);

        // Threshold the image to get only blue pixels
        Mat mask = new Mat();
        Core.inRange(hsvImage, lowerBlue, upperBlue, mask);

        // Convert the masked image to byte array
        byte[] maskedImageBytes = matToBytes(mask);

        // Perform OCR on the masked image bytes
        String extractedText = performOCR(maskedImageBytes);

        return extractedText;
    }

    private byte[] matToBytes(Mat image) throws IOException {
        // Convert Mat to BufferedImage
        int type = BufferedImage.TYPE_BYTE_GRAY;
        if (image.channels() > 1) {
            type = BufferedImage.TYPE_3BYTE_BGR;
        }
        int bufferSize = image.channels() * image.cols() * image.rows();
        byte[] b = new byte[bufferSize];
        image.get(0, 0, b);
        BufferedImage bufferedImage = new BufferedImage(image.cols(), image.rows(), type);
        final byte[] targetPixels = ((DataBufferByte) bufferedImage.getRaster().getDataBuffer()).getData();
        System.arraycopy(b, 0, targetPixels, 0, b.length);

        // Convert BufferedImage to byte array
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", outputStream);
        return outputStream.toByteArray();
    }

}