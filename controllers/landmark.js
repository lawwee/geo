const express = require("express");
// const mongoose = require("mongoose");

const Landmark = require("../models/landmark");

exports.discover = async (req, res) => {
    try {
        const { long, lat, propertyType } = req.body;
        
        if (!long || lat) {
            return res.status(400).json({
                message: 'Longitude and Latitude are required parameters'
            })
        }

        const query = {
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(long), parseFloat(lat)]
                    },
                    $maxDistance: 100000
                }
            }
        }

        const nearbyPlaces = await Landmark.find(query);

        res.json({
            message: "Retreieved successfully",
            ...nearbyPlaces
        })
    } catch (error) {
        console.error("error discovering nearby places", error.message);
        res.status(500).json({
            error: "Internal Server error"
        })
    }
}

