import React from "react";

function Rating({ rating }) {
    return (
        <div className="rating-circle">
            <span className="rating-number">{rating}</span>
            <div className="circle-backdrop">
                <div
                    className="circle-fill"
                    style={{
                        background: `conic-gradient(#003DC6 ${
                            rating * 10
                        }%, transparent 0)`,
                    }}
                >
                    <div className="circle-inner-fill"></div>
                </div>
            </div>
        </div>
    );
}

export default Rating;
